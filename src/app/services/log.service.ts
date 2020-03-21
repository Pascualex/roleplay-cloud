import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Log } from 'src/app/models/Log';
import { LogEntry } from 'src/app/models/LogEntry';
import { User } from 'src/app/models/User';
import { firestore } from 'firebase';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.logsCollection = this.afs.collection('logs');
  }

  public getLog(id: string): Observable<Log> {
    const logDocument: AngularFirestoreDocument<any> = this.logsCollection.doc(id);
    return logDocument.valueChanges().pipe(
      // Transforms RawLog to Log
      map((rawLog) => {
        return new Log(rawLog.title, id);
      }),
      // Adds entries to the log
      switchMap((log: Log) => {
        return this.fetchEntriesToLog(log);
      })
    );
  }

  private fetchEntriesToLog(log: Log): Observable<Log> {
    const logDocument: AngularFirestoreDocument<any> = this.logsCollection.doc(log.id);
    const entriesCollection: AngularFirestoreCollection<any> = logDocument.collection(
      'entries',
      ref => ref.orderBy('timestamp')
    );
    return entriesCollection.valueChanges().pipe(
      // Transforms RawLogEntry[] to LogEntry[]
      switchMap((rawEntries) => {
        return this.rawLogEntriesToLogEntries(rawEntries);
      }),
      map((entries: LogEntry[]) => {
        log.entries = entries;
        return log;
      })
    );
  }

  private rawLogEntriesToLogEntries(rawEntries): Observable<LogEntry[]> {
    // Gets unique uids
    const uids: string[] = Array.from(new Set(rawEntries.map(rawEntry => rawEntry.uid)));
    // Transforms uids to users
    const users: Observable<User>[] = uids.map((uid: string) => {
      return this.userService.getUser(uid).pipe(
        map((user: User) => {
          return (user != null ? user : new User('user-removed', uid));
        })
      );
    });
    // Maps each rawEntry to its user and transforms it to LogEntry
    return (users.length > 0 ? combineLatest(users) : of([])).pipe(
      map((users: User[]) => {
        const userByUid: Map<string, User> = new Map();
        users.forEach((user: User) => userByUid[user.uid] = user);
        return rawEntries.map((rawEntry) => {
          const timestamp: Date = (
            rawEntry.timestamp != null ?
            rawEntry.timestamp.toDate() :
            Date.now()
          );
          return new LogEntry(
            rawEntry.message,
            rawEntry.type,
            timestamp,
            userByUid[rawEntry.uid]
          );
        });
      })
    );
  }

  public async checkLogExists(id: string): Promise<boolean> {
    const logDocument: AngularFirestoreDocument<any> = this.logsCollection.doc(id);
    return (await logDocument.get().toPromise()).exists;
  }

  public sendEntry(log: Log, entry: LogEntry): Promise<boolean> {
    const logDocument: AngularFirestoreDocument<any> = this.logsCollection.doc(log.id);
    const entriesCollection: AngularFirestoreCollection<any> = logDocument.collection('entries');
    return entriesCollection.add({
      message: entry.message,
      type: entry.type,
      timestamp: firestore.FieldValue.serverTimestamp(),
      uid: entry.author.uid
    }).then(
      _ => true,
      _ => false
    );
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Log } from 'src/app/models/Log';
import { LogEntry } from 'src/app/models/LogEntry';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logsCollection: AngularFirestoreCollection<any>;
  private usersCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.logsCollection = this.afs.collection('logs');
    this.usersCollection = this.afs.collection('users');
  }

  public getLog(id: string): Observable<Log> {
    const logDocument: AngularFirestoreDocument<any> = this.logsCollection.doc(id);
    return logDocument.valueChanges().pipe(
      // Transforms RawLog to Log
      map((rawLog) => {
        return new Log(id, rawLog.title);
      }),
      // Adds entries to the log
      switchMap((log: Log) => {
        return this.addEntriesToLog(log);
      })
    );
  }

  private addEntriesToLog(log: Log): Observable<Log> {
    const logDocument: AngularFirestoreDocument<any> = this.logsCollection.doc(log.id);
    return logDocument.collection('entries', ref => ref.orderBy('timestamp')).valueChanges().pipe(
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
      const userDocument: AngularFirestoreDocument<any> = this.usersCollection.doc(uid);
      return userDocument.snapshotChanges().pipe(
        map((rawUserSnapshot) => {
          return new User(
            rawUserSnapshot.payload.id,
            rawUserSnapshot.payload.data().username
          );
        })
      );
    });
    // Maps each rawEntry to its user and transforms it to LogEntry
    return (users.length > 0 ? combineLatest(users) : of([])).pipe(
      map((users: User[]) => {
        const userByUid: Map<string, User> = new Map<string, User>();
        users.forEach((user: User) => userByUid[user.uid] = user);
        return rawEntries.map((rawEntry) => {
          return new LogEntry(
            rawEntry.message,
            rawEntry.type,
            rawEntry.timestamp.toDate(),
            userByUid[rawEntry.uid]
          );
        });
      })
    );
  }

  public async checkLogExists(id: string): Promise<boolean> {
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(id);
    return (await logDocument.get().toPromise()).exists;
  }

  public sendEntry(logId: string, entry: LogEntry): void {
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(logId);
    if (logDocument != null) {
      const entriesCollection: AngularFirestoreCollection<LogEntry> = logDocument.collection('entries');
      entriesCollection.add(entry);
    }
  }
}

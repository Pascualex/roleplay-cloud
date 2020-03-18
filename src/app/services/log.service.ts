import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { Log } from '../models/Log';
import { LogEntry } from '../models/LogEntry';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logsCollection: AngularFirestoreCollection<Log>;

  constructor(private afs: AngularFirestore) {
    this.logsCollection = this.afs.collection('logs');
  }

  public getLogs(): Observable<Log[]> {
    return this.logsCollection.valueChanges();
  }

  public getLog(id: string): Observable<Log> {
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(id);
    return logDocument.valueChanges().pipe(
      map((log: Log) => {
        log.id = id;
        return log;
      })
    );
  }

  public async checkLogExists(id: string): Promise<boolean> {
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(id);
    return (await logDocument.get().toPromise()).exists;
  }

  public getEntries(logId: string): Observable<LogEntry[]> {
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(logId);
    if (logDocument != null) {
      const entriesCollection: AngularFirestoreCollection<LogEntry> = logDocument.collection(
        'entries',
        ref => ref.orderBy('timestamp')
      );
      return entriesCollection.valueChanges();
    } else {
      return empty();
    }
  }

  public sendEntry(logId: string, entry: LogEntry): void {
    entry.timestamp = firestore.FieldValue.serverTimestamp();
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(logId);
    if (logDocument != null) {
      const entriesCollection: AngularFirestoreCollection<LogEntry> = logDocument.collection('entries');
      entriesCollection.add(entry);
    }
  }
}

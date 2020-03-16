import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { Log } from '../models/Log';
import { LogEntry, Timestamp } from '../models/LogEntry';

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
    if (logDocument != null) {
      return logDocument.valueChanges().pipe(
        map((log: Log) => {
          log.id = id;
          return log;
        })
      );
    } else {
      return empty();
    }
  }

  public getEntries(log: Log): Observable<LogEntry[]> {
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(log.id);
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

  public sendEntry(log: Log, entry: LogEntry): void {
    const logDocument: AngularFirestoreDocument<Log> = this.logsCollection.doc(log.id);
    if (logDocument != null) {
      const entriesCollection: AngularFirestoreCollection<LogEntry> = logDocument.collection('entries');
      entriesCollection.add(entry);
    }
  }
}

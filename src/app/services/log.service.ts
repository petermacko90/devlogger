import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/Log'

@Injectable()
export class LogService {
	logs: Log[];

	private logSource = new BehaviorSubject<Log>({
		id: null, text: null, date: null
	});
	selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
  	/*this.logs = [
  		{
  			id: '1',
  			text: 'Generated components',
  			date: new Date('2018-01-01 12:31:55')
  		},
  		{
  			id: '2',
  			text: 'Added Bootstrap',
  			date: new Date('2018-01-02 09:15:05')
  		},
  		{
  			id: '3',
  			text: 'Added logs component',
  			date: new Date('2018-01-03 10:20:00')
  		}
  	];*/
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

  	return of(this.logs.sort((a, b) => {
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log) {
  	this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'rangeDate'
})

export class DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let results = [];
    if (args) {
      const range = args.map(d => moment(d));
      console.log(range, "RANGE");
      for (let x = 0; x < value.length; x++) {
        if (range[0] && moment(range[1]).format('DD/MM/YYYY') != 'Invalid date') {
          if (moment(range[0]).format('DD/MM/YYYY') == moment(range[1]).format('DD/MM/YYYY')) {
            console.log('test1');
            if (moment(range[0]).format('DD/MM/YYYY') == moment(value[x].created_at).format('DD/MM/YYYY')) {
              results.push(value[x]);
            }
          }
          else if (range[0] <= moment(value[x].created_at) && range[1] + 86400000 >= moment(value[x].created_at)) {
            results.push(value[x]);
          }
        }
        else {
          console.log('test');
          console.log(moment(range[0]).format('DD/MM/YYYY'), "-");
          console.log(moment(value[x].created_at).format('DD/MM/YYYY'), "^");
          if (moment(range[0]).format('DD/MM/YYYY') == moment(value[x].created_at).format('DD/MM/YYYY')) {
            results.push(value[x]);
          }
        }
      }
      console.log(range[0] + ' - ' + range[1]);
      return results;
    } else {
      return value;
    }
  }
}
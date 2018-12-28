var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import * as moment from 'moment';
var DatePipe = /** @class */ (function () {
    function DatePipe() {
    }
    DatePipe.prototype.transform = function (value, args) {
        var results = [];
        if (args) {
            var range = args.map(function (d) { return moment(d); });
            console.log(range, "RANGE");
            for (var x = 0; x < value.length; x++) {
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
        }
        else {
            return value;
        }
    };
    DatePipe = __decorate([
        Pipe({
            name: 'rangeDate'
        })
    ], DatePipe);
    return DatePipe;
}());
export { DatePipe };
//# sourceMappingURL=date.pipe.js.map
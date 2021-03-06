var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var SearchpipePipe = /** @class */ (function () {
    function SearchpipePipe() {
    }
    SearchpipePipe.prototype.transform = function (value, args) {
        if (!value)
            return null;
        if (!args)
            return value;
        console.log(value, "VALUE");
        console.log(args, "ARGS");
        args = args.toLowerCase();
        return value.filter(function (item) {
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    };
    SearchpipePipe = __decorate([
        Pipe({
            name: 'searchpipe'
        })
    ], SearchpipePipe);
    return SearchpipePipe;
}());
export { SearchpipePipe };
//# sourceMappingURL=searchpipe.pipe.js.map
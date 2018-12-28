var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
var URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
import swal from 'sweetalert2';
var AddFileComponent = /** @class */ (function () {
    function AddFileComponent(routeparams, fileservice, spinner, router) {
        this.routeparams = routeparams;
        this.fileservice = fileservice;
        this.spinner = spinner;
        this.router = router;
        this.file_category = [];
        this.name = '';
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.selectedCategory = '';
        this.file = {};
        this.editBolean = false;
        this.uploader.onAfterAddingFile = function (data) {
            //    this.uploadAll();
            console.log(data.file.rawFile, "UP");
        };
    }
    AddFileComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    AddFileComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    AddFileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routeparams.snapshot.params) {
            this.file = this.routeparams.snapshot.params;
            if (this.file.id) {
                this.editBolean = true;
                this.selectedCategory = this.file.file_category_id;
                this.name = this.file.name;
            }
        }
        this.spinner.show();
        this.fileservice.getFileCategory().then(function (response) {
            _this.spinner.hide();
            var data = response;
            if (data.data) {
                _this.file_category = data.data;
                console.log(_this.file_category);
            }
        }, function (err) {
        });
    };
    AddFileComponent.prototype.editFile = function () {
        var _this = this;
        this.spinner.show();
        var params = {};
        if (this.uploader.queue[0]) {
            params = {
                'file': this.uploader.queue[0].file.rawFile,
                'file_category_id': this.selectedCategory,
                'name': this.name
            };
        }
        else {
            params = {
                'file_category_id': this.selectedCategory,
                'name': this.name
            };
        }
        this.fileservice.editFile(this.file.id, params).then(function (response) {
            var data = response;
            if (data.data) {
                _this.spinner.hide();
                swal({
                    type: 'success',
                    title: 'Success!',
                    text: 'close',
                });
                _this.router.navigate(['/files', { id: _this.selectedCategory }]);
            }
            else {
                _this.spinner.hide();
                swal({
                    type: 'warning',
                    title: 'Error!',
                    text: 'close',
                });
            }
        });
    };
    AddFileComponent.prototype.addFile = function () {
        var _this = this;
        this.spinner.show();
        if (this.uploader.queue[0]) {
            var params = {
                'file': this.uploader.queue[0].file.rawFile,
                'file_category_id': this.selectedCategory,
                'name': this.name
            };
            this.fileservice.uploadFile(params).then(function (response) {
                var data = response;
                console.log(data);
                if (data.data) {
                    swal({
                        type: 'success',
                        title: 'Success!',
                        text: 'close',
                    });
                    _this.spinner.hide();
                    _this.router.navigate(['/files', { id: _this.selectedCategory }]);
                }
                else {
                    _this.spinner.hide();
                    swal({
                        type: 'warning',
                        title: 'Error!',
                        text: 'close',
                    });
                    _this.name = '';
                    _this.selectedCategory = '';
                    _this.uploader.clearQueue();
                }
            });
        }
        else {
            this.spinner.hide();
            swal({
                type: 'warning',
                title: 'File is Required',
                text: 'close',
            });
        }
    };
    AddFileComponent = __decorate([
        Component({
            selector: 'app-add-file',
            templateUrl: './add-file.component.html',
            styleUrls: ['./add-file.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, FileService, NgxSpinnerService, Router])
    ], AddFileComponent);
    return AddFileComponent;
}());
export { AddFileComponent };
//# sourceMappingURL=add-file.component.js.map
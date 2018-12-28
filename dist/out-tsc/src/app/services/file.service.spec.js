import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';
describe('FileService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(FileService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=file.service.spec.js.map
import { TestBed } from '@angular/core/testing';
import { ManufacturerService } from './manufacturer.service';
describe('ManufacturerService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ManufacturerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=manufacturer.service.spec.js.map
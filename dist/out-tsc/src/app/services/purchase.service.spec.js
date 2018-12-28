import { TestBed } from '@angular/core/testing';
import { PurchaseService } from './purchase.service';
describe('PurchaseService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PurchaseService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=purchase.service.spec.js.map
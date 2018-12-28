import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';
describe('ItemService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ItemService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=item.service.spec.js.map
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

function buildToken(payload: object): string {
  const base64 = btoa(JSON.stringify(payload));
  return ['header', base64, 'signature'].join('.');
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login and store token', () => {
    service.login({ username: 'alice', password: 'pass' }).subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    const token = buildToken({ sub: 'alice', role: 'USER' });
    req.flush({ token });

    expect(service.session()?.username).toEqual('alice');
    expect(localStorage.getItem('product-app-token')).toEqual(token);
  });

  it('should logout and clear storage', () => {
    localStorage.setItem('product-app-token', 'token');
    service.logout();
    expect(localStorage.getItem('product-app-token')).toBeNull();
  });
});

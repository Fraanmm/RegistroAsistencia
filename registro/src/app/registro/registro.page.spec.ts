import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

describe('RegistroPage', () => {
  let componente: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería navegar a /login cuando registrarUsuario se llama con todos los campos llenos', () => {
    componente.nombreUsuario = 'UsuarioTest';
    componente.correo = 'test@example.com';
    componente.contrasena = 'password123';
    componente.fechaNacimiento = '2000-01-01';
    componente.nivelEducacional = 'Universitario';
    
    componente.registrarUsuario();
    
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería mostrar una alerta si no se completan todos los campos en registrarUsuario', () => {
    spyOn(window, 'alert');
    componente.nombreUsuario = ''; // Dejamos un campo vacío
    componente.correo = 'test@example.com';
    componente.contrasena = 'password123';
    componente.fechaNacimiento = '2000-01-01';
    componente.nivelEducacional = 'Universitario';

    componente.registrarUsuario();

    expect(window.alert).toHaveBeenCalledWith('Por favor, complete todos los campos.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});


import Guia from '../../src/dominio/entidades/Guia';
import EstadoGuia  from '../../src/dominio/enums/EstadoGuia';


describe('Guia', () => {
  let guia: Guia;

  beforeEach(() => {
    guia = new Guia('GU001', 'Juan Pérez', 5000);
  });

  describe('Constructor', () => {
    it('debe crear una guía con los datos correctos', () => {
      expect(guia.getNumeroGuia()).toBe('GU001');
      expect(guia.getCliente()).toBe('Juan Pérez');
      expect(guia.getValorDeclarado()).toBe(5000);
    });

    it('debe crear una guía en estado CREADA por defecto', () => {
      expect(guia.getEstado()).toBe(EstadoGuia.CREADA);
    });

    it('debe asignar la fecha de creación', () => {
      expect(guia.getFechaCreacion()).toBeInstanceOf(Date);
    });
  });

  describe('facturarGuia', () => {
    it('debe cambiar el estado de CREADA a FACTURADA', () => {
      guia.facturarGuia();
      expect(guia.getEstado()).toBe(EstadoGuia.FACTURADA);
    });

    it('debe lanzar error si intenta facturar una guía facturada', () => {
      guia.facturarGuia();
      expect(() => guia.facturarGuia()).toThrow(
        'No se puede facturar una guía en estado FACTURADA'
      );
    });

    it('debe lanzar error si intenta facturar una guía anulada', () => {
      guia.anularGuia();
      expect(() => guia.facturarGuia()).toThrow();
    });
  });

  describe('anularGuia', () => {
    it('debe cambiar el estado a ANULADA', () => {
      guia.anularGuia();
      expect(guia.getEstado()).toBe(EstadoGuia.ANULADA);
    });

    it('debe lanzar error si intenta anular una guía facturada', () => {
      guia.facturarGuia();
      expect(() => guia.anularGuia()).toThrow(
        'No se puede anular una guía facturada'
      );
    });

    it('debe permitir anular una guía en estado CREADA', () => {
      expect(() => guia.anularGuia()).not.toThrow();
      expect(guia.getEstado()).toBe(EstadoGuia.ANULADA);
    });
  });

  describe('toJSON', () => {
    it('debe retornar un objeto con los datos de la guía', () => {
      const json = guia.toJSON();
      expect(json.numeroGuia).toBe('GU001');
      expect(json.cliente).toBe('Juan Pérez');
      expect(json.valorDeclarado).toBe(5000);
      expect(json.estado).toBe(EstadoGuia.CREADA);
    });
  });
});
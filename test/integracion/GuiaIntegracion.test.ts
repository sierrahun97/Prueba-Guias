import Guia from '../../src/dominio/entidades/Guia';
import EstadoGuia from '../../src/dominio/enums/EstadoGuia';

describe('Guia - Integration Tests', () => {
  describe('Workflow: Crear y Facturar Guía', () => {
    it('debe completar flujo: crear guía → facturar → verificar estado', () => {
      const guia = new Guia('GU001', 'Juan Pérez', 5000);
      expect(guia.getEstado()).toBe(EstadoGuia.CREADA);
      
      guia.facturarGuia();
      expect(guia.getEstado()).toBe(EstadoGuia.FACTURADA);
      expect(guia.getNumeroGuia()).toBe('GU001');
      expect(guia.getValorDeclarado()).toBe(5000);
    });

    it('debe serializar guía facturada correctamente', () => {
      const guia = new Guia('GU002', 'María García', 10000);
      guia.facturarGuia();
      
      const json = guia.toJSON();
      expect(json.estado).toBe(EstadoGuia.FACTURADA);
      expect(json.numeroGuia).toBe('GU002');
      expect(json.cliente).toBe('María García');
    });
  });

  describe('Workflow: Crear y Anular Guía', () => {
    it('debe completar flujo: crear guía → anular → verificar estado', () => {
      const guia = new Guia('GU003', 'Carlos López', 3000);
      expect(guia.getEstado()).toBe(EstadoGuia.CREADA);
      
      guia.anularGuia();
      expect(guia.getEstado()).toBe(EstadoGuia.ANULADA);
    });

    it('no debe permitir facturar después de anular', () => {
      const guia = new Guia('GU004', 'Ana Rodríguez', 7500);
      guia.anularGuia();
      
      expect(() => guia.facturarGuia()).toThrow();
      expect(guia.getEstado()).toBe(EstadoGuia.ANULADA);
    });
  });

  describe('Workflow: Múltiples Guías', () => {
    it('debe manejar múltiples guías con diferentes estados', () => {
      const guias = [
        new Guia('GU005', 'Cliente A', 5000),
        new Guia('GU006', 'Cliente B', 8000),
        new Guia('GU007', 'Cliente C', 12000),
      ];

      guias[0].facturarGuia();
      guias[1].anularGuia();
      // guias[2] permanece en CREADA

      expect(guias[0].getEstado()).toBe(EstadoGuia.FACTURADA);
      expect(guias[1].getEstado()).toBe(EstadoGuia.ANULADA);
      expect(guias[2].getEstado()).toBe(EstadoGuia.CREADA);
    });

    it('debe procesar lote de guías y generar reporte JSON', () => {
      const guias = [
        new Guia('GU008', 'Empresa X', 15000),
        new Guia('GU009', 'Empresa Y', 20000),
      ];

      guias[0].facturarGuia();
      
      const reporte = guias.map(g => g.toJSON());
      expect(reporte).toHaveLength(2);
      expect(reporte[0].estado).toBe(EstadoGuia.FACTURADA);
      expect(reporte[1].estado).toBe(EstadoGuia.CREADA);
    });
  });

  describe('Workflow: Estado y Validaciones', () => {
    it('debe prevenir transiciones inválidas de estado', () => {
      const guia = new Guia('GU010', 'Test', 5000);
      
      guia.facturarGuia();
      expect(() => guia.facturarGuia()).toThrow('No se puede facturar una guía en estado FACTURADA');
      expect(() => guia.anularGuia()).toThrow('No se puede anular una guía facturada');
    });

    it('debe mantener integridad de datos tras operaciones', () => {
      const guia = new Guia('GU011', 'Integridad Test', 9999);
      const fechaOriginal = guia.getFechaCreacion();
      
      guia.facturarGuia();
      
      expect(guia.getNumeroGuia()).toBe('GU011');
      expect(guia.getCliente()).toBe('Integridad Test');
      expect(guia.getValorDeclarado()).toBe(9999);
      expect(guia.getFechaCreacion()).toEqual(fechaOriginal);
    });
  });

  describe('Workflow: Serialización y Deserialización', () => {
    it('debe serializar y reconstruir estado de guía', () => {
      const guiaOriginal = new Guia('GU012', 'Serialización', 5500);
      guiaOriginal.facturarGuia();
      
      const json = guiaOriginal.toJSON();
      const guiaReconstruida = new Guia(
        json.numeroGuia,
        json.cliente,
        json.valorDeclarado,
        json.estado,
        json.fechaCreacion
      );
      
      expect(guiaReconstruida.getEstado()).toBe(EstadoGuia.FACTURADA);
      expect(guiaReconstruida.getNumeroGuia()).toBe('GU012');
    });
  });
});
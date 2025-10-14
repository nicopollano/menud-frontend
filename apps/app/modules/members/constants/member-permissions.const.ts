import { UserRole } from '@ristokit/shared/models/general.model'

export const MEMBER_PERMISSIONS = [
  {
    role: UserRole.OWNER,
    label: 'Permiso de administrador',
    permissions: [
      'Acceso total al restaurante y todas las sucursales',
      'Gestionar usuarios y roles',
      'Gestionar menús y productos',
      'Ver reportes y estadísticas'
    ]
  },
  {
    role: UserRole.MANAGER,
    label: 'Permiso de gerente',
    permissions: [
      'Acceso a la sucursal asignada',
      'Gestionar empleados de la sucursal',
      'Ver reportes de ventas y rendimiento'
    ]
  }
  // {
  //   role: UserRole.CASHIER,
  //   label: 'Permiso de cajero',
  //   permissions: [
  //     'Procesar pagos y gestionar transacciones',
  //     'Acceso limitado a la información del menú',
  //     'No puede gestionar usuarios ni ver reportes'
  //   ]
  // }
]

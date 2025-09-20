const API_URL = "http://localhost:3000/api/group";
import { toast } from "react-toastify"

export const GroupService = {
  async register(name, docenteId) {
    try {
        // Preparar los datos según la estructura esperada por el backend
        const groupData = {
          nombre: name,
          docenteId
        }
  
        // Realizar la petición POST al backend usando fetch
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include',
          body: JSON.stringify(groupData)
        })
  
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || 'Error al registrar el grupo');
          return;
        }
  
        const data = await response.json()
  
        // Mostrar mensaje de éxito
        toast.success('Grupo Registrado Exitosamente')
  
        return data;
      } catch (error) {
        // Mostrar mensaje de error
        toast.error(error.message || 'Error al registrar el grupo')
        console.error('Error al registrar grupo:', error)
    }
  },

  async getAll() {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
    })

    if (!response.ok) {
      const dataError = await response.json();
      console.log(dataError.message);
      throw new Error('Error al obtener los grupos')
    }

    const data = await response.json();

    console.log(data)

    return data;
  },

  async update(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el grupo')
    }

    const responseData = await response.json();

    toast.success(responseData.message);

    return responseData;
  },
    async delete(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar el grupo');
    }

    toast.success('Grupo Eliminado Exitosamente');
    
    return;
  },
};
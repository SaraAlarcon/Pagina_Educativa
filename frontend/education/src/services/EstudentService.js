const API_URL = "http://localhost:3000/api/student";
import { toast } from "react-toastify"

export const EstudentService = {
  async register(name, lastName, email, password) {
    try {
        // Preparar los datos según la estructura esperada por el backend
        const estudentData = {
          NombreCompleto: `${name} ${lastName}`,
          email: email,
          password: password
        }
  
        // Realizar la petición POST al backend usando fetch
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include',
          body: JSON.stringify(estudentData)
        })
  
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || 'Error al registrar el estudiante');
          return;
        }
  
        const data = await response.json()
  
        // Mostrar mensaje de éxito
        toast.success('Estudiante Registrado Exitosamente')
  
        return data;
      } catch (error) {
        // Mostrar mensaje de error
        toast.error(error.message || 'Error al registrar el estudiante')
        console.error('Error al registrar estudiante:', error)
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
      throw new Error('Error al obtener los estudiantes')
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
      throw new Error('Error al actualizar el estudiante')
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
      throw new Error('Error al eliminar el estudiante');
    }

    toast.success('Estudiante Eliminado Exitosamente');
    
    return;
  },
};
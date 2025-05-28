// services/PostsService.js

const API_BASE_URL = 'http://localhost:3000/api/post';

export default class PostsService {
  /**
   * Crear una nueva publicación
   * @param {Object} postData - Datos de la publicación
   * @param {Array} attachments - Archivos adjuntos
   * @param {string} token - Token de autenticación
   */
  static async create(postData, attachments = [], token) {
    const formData = new FormData();
    
    // Agregar campos de la publicación al FormData
    Object.keys(postData).forEach(key => {
      formData.append(key, postData[key]);
    });
    
    // Agregar archivos adjuntos
    attachments.forEach((file, index) => {
      formData.append('attachments', file);
    });

    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al crear la publicación');
    }

    return await response.json();
  }

  /**
   * Actualizar una publicación existente
   * @param {string} postId - ID de la publicación
   * @param {Object} postData - Datos actualizados
   * @param {string} token - Token de autenticación
   */
  static async update(postId, postData, token) {
    const response = await fetch(`${API_BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la publicación');
    }

    return await response.json();
  }

  /**
   * Eliminar una publicación
   * @param {string} postId - ID de la publicación
   * @param {string} token - Token de autenticación
   */
  static async delete(postId, token) {
    const response = await fetch(`${API_BASE_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la publicación');
    }

    return await response.json();
  }

  /**
   * Obtener publicaciones por grupo
   * @param {string} groupId - ID del grupo
   * @param {string} token - Token de autenticación
   */
  static async getForGroup(groupId, token) {
    const response = await fetch(`${API_BASE_URL}/grupo/${groupId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener publicaciones del grupo');
    }

    return await response.json();
  }

  /**
   * Obtener publicaciones por docente
   * @param {string} teacherId - ID del docente
   * @param {string} token - Token de autenticación
   */
  static async getByTeacher(teacherId, token) {
    const response = await fetch(`${API_BASE_URL}/docente/${teacherId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener publicaciones del docente');
    }

    return await response.json();
  }

  /**
   * Obtener una publicación por su ID
   * @param {string} postId - ID de la publicación
   * @param {string} token - Token de autenticación
   */
  static async getById(postId, token) {
    const response = await fetch(`${API_BASE_URL}/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la publicación');
    }

    return await response.json();
  }
}
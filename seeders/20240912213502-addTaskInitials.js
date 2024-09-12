'use strict';

/* @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insertar tareas predeterminadas
    const [programadaTask, procesoTask, revisionTask] = await queryInterface.bulkInsert('Tasks', [
      {
        state: 'programada',
        dateCreated: new Date()
      },
      {
        state: 'proceso',
        dateCreated: new Date()
      },
      {
        state: 'revision',
        dateCreated: new Date()
      }
    ], { returning: true });

    // Obtener todos los proyectos existentes
    const projects = await queryInterface.sequelize.query(
      'SELECT id FROM Proyects',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Crear asociaciones entre las tareas y todos los proyectos
    const projectTasks = [];
    projects.forEach(project => {
      projectTasks.push({
        projectId: project.id,
        taskId: programadaTask.id
      });
      projectTasks.push({
        projectId: project.id,
        taskId: procesoTask.id
      });
      projectTasks.push({
        projectId: project.id,
        taskId: revisionTask.id
      });
    });

    // Insertar asociaciones en la tabla de asociación
    await queryInterface.bulkInsert('ProjectTasks', projectTasks);
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar las tareas predeterminadas y sus asociaciones
    await queryInterface.bulkDelete('ProjectTasks', null, {});
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
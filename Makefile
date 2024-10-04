# Variables
SHELL := /bin/bash
BUILD_DIR = build


install: #Instalar dependencias y construir el proyecto.
	@echo "Instalando dependencias..."
	@npm install

clean: ## Elimina el directorio de build
	@echo "Limpiando el directorio de build..."
	@rm -rf $(BUILD_DIR)

build: #construir el proyecto en modo producción
	@echo "Construyendo el programa..."
	@npm run build 
	@echo "preview del proyecto..."
	@npm run preview

run: #Para correr el proyecto en modo de desarrollo
	@echo "Corriendo la api en modo desarrollo..."
	@npm run dev

formater: #Ejecutar este comando para formatear el código
	@echo "Formateando el código..."
	@npm run format

test-depend: #Para instalar las dependecias para poder ejecutar los test
	@echo "Instalando dependecias para los tests..."
	@npm install --save-dev vitest

test: #Ejecutar los test de front 
	@echo "Ejecutando test..."
	@npm run test

test-coverage: #Si se quiere ver el porcentaje del front que está cubierto por los test se debe de ejecutar
	@echo "Visualizando el porcentaje de test con la herramienta coverage..."
	@npm run coverage

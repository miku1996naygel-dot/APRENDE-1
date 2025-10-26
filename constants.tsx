
import React from 'react';
import { DiagnosticQuestion, Tutorial } from './types';
import { ComputerIcon, SmartphoneIcon } from './components/common/Icons';

export const TUTORIALS_DATA: Tutorial[] = [
  {
    id: 'computer-basics-1',
    category: 'Conceptos Básicos de la Computadora',
    title: '¿Qué es una computadora y para qué sirve?',
    icon: <ComputerIcon />,
    content: [
      "Una computadora es una máquina electrónica que nos ayuda a hacer muchas tareas. ¡Es como un cerebro mágico!",
      "Puedes usarla para escribir cartas, dibujar, ver fotos y videos, escuchar música y buscar información en Internet.",
      "Está formada por varias partes: el monitor (la pantalla), el teclado (para escribir), el ratón (para mover el puntero) y la torre o CPU (el cerebro de la computadora)."
    ]
  },
  {
    id: 'computer-basics-2',
    category: 'Conceptos Básicos de la Computadora',
    title: 'Cómo usar el ratón (mouse)',
    icon: <ComputerIcon />,
    content: [
      "El ratón o mouse es una herramienta que te permite mover un puntero (una flechita) en la pantalla.",
      "Mueve el ratón sobre una superficie plana y verás cómo se mueve la flechita.",
      "El ratón tiene botones. El botón izquierdo se usa para seleccionar cosas. A esto se le llama 'hacer clic'. Si haces dos clics rápidos, se llama 'doble clic' y sirve para abrir programas o archivos.",
      "El botón derecho se usa para ver opciones especiales. ¡Intenta hacer clic derecho en un espacio vacío del escritorio!"
    ]
  },
  {
    id: 'computer-basics-3',
    category: 'Conceptos Básicos de la Computadora',
    title: 'Cómo usar el teclado',
    icon: <ComputerIcon />,
    content: [
        "El teclado tiene muchas teclas con letras, números y símbolos.",
        "Usa las teclas de letras para escribir palabras. La tecla 'Espacio' (la más larga) sirve para dejar un espacio entre palabras.",
        "La tecla 'Enter' o 'Intro' sirve para pasar a la siguiente línea, como si fuera un punto y aparte.",
        "La tecla 'Borrar' (Backspace) sirve para eliminar lo que has escrito, letra por letra hacia atrás."
    ]
  },
  {
    id: 'smartphone-basics-1',
    category: 'Conceptos Básicos del Celular',
    title: 'Encender y desbloquear tu celular',
    icon: <SmartphoneIcon />,
    content: [
      "Para encender tu celular, busca un botón en el costado o en la parte de arriba. Mantenlo presionado unos segundos hasta que la pantalla se ilumine.",
      "Una vez encendido, verás la 'pantalla de bloqueo'. Para desbloquear, desliza tu dedo por la pantalla, dibuja un patrón o usa tu huella digital, dependiendo de tu celular.",
      "La pantalla principal tiene íconos, que son pequeños dibujos que representan aplicaciones. Toca un ícono para abrir una aplicación."
    ]
  },
  {
    id: 'smartphone-basics-2',
    category: 'Conceptos Básicos del Celular',
    title: 'Hacer una llamada',
    icon: <SmartphoneIcon />,
    content: [
      "Busca el ícono del teléfono, que usualmente es de color verde, y tócalo.",
      "Verás un teclado numérico. Puedes marcar el número de la persona a la que quieres llamar.",
      "Después de marcar, toca el botón verde de llamar para iniciar la llamada.",
      "Para terminar, toca el botón rojo de colgar."
    ]
  },
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    text: "¿Alguna vez has usado una computadora o un celular?",
    options: [
      { text: "Nunca", value: 0 },
      { text: "Muy pocas veces", value: 1 },
      { text: "Sí, a veces", value: 2 },
      { text: "Sí, con frecuencia", value: 3 }
    ]
  },
  {
    id: 2,
    text: "¿Sabes qué es un correo electrónico y cómo enviarlo?",
    options: [
      { text: "No sé qué es", value: 0 },
      { text: "He oído de él, pero no sé usarlo", value: 1 },
      { text: "Sé lo que es, pero necesito ayuda para enviar uno", value: 2 },
      { text: "Sí, puedo enviar correos sin problemas", value: 3 }
    ]
  },
  {
    id: 3,
    text: "¿Te sientes cómodo/a buscando información en Internet (usando Google, por ejemplo)?",
    options: [
      { text: "No, me da miedo o no sé cómo hacerlo", value: 0 },
      { text: "Lo he intentado, pero me cuesta mucho", value: 1 },
      { text: "A veces encuentro lo que busco", value: 2 },
      { text: "Sí, me resulta fácil", value: 3 }
    ]
  }
];

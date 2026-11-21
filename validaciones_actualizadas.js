const reglas = {
  nombre: { regex: /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]{0,99}$/, mensaje: "Falta Nombre o está mal." },
  paterno: { regex: /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]{0,99}$/, mensaje: "Falta Apellido Paterno." },
  materno: { regex: /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]{0,99}$/, mensaje: "Falta Apellido Materno." },
  edad: { regex: /^\d{1,3}$/, mensaje: "Falta Edad." },
  fecha: { regex: /^\d{4}-\d{2}-\d{2}$/, mensaje: "Falta Fecha de nacimiento." },
  tarjeta: { regex: /^\d{4} \d{4} \d{4} \d{4}$/, mensaje: "Falta Tarjeta, deben ser 16 dígitos." },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensaje: "Falta Correo o está mal." },
  plan: { regex: /.+/, mensaje: "Falta elegir Plan." }
};

const filtros = {
  nombre: v => v.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ ]/g, '').slice(0, 100),
  paterno: v => v.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ ]/g, '').slice(0, 100),
  materno: v => v.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ ]/g, '').slice(0, 100),
  edad: v => v.replace(/\D/g, '').slice(0, 3),
  tarjeta: v => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
};

Object.keys(filtros).forEach(id => {
  const campo = document.getElementById(id);
  if (!campo) return;
  campo.addEventListener('input', () => {
    campo.value = filtros[id](campo.value);
    validarCampo(id);
  });
  campo.addEventListener('blur', () => validarCampo(id));
});

['fecha','email','plan'].forEach(id => {
  const c = document.getElementById(id);
  c.addEventListener('change', () => validarCampo(id));
  c.addEventListener('blur', () => validarCampo(id));
});

function validarCampo(id) {
  const campo = document.getElementById(id);
  const error = document.getElementById('error-' + id);
  const ok = reglas[id].regex.test(campo.value.trim());
  campo.classList.toggle('invalido', !ok);
  if (error) error.textContent = (campo.value.trim() === '' || ok) ? '' : reglas[id].mensaje;
  return ok;
}

const form = document.getElementById('formulario');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', e => {
  e.preventDefault();
  let todoCorrecto = true;
  ['nombre','paterno','materno','edad','fecha','tarjeta','email','plan'].forEach(id => {
    if (!validarCampo(id)) todoCorrecto = false;
  });

  if (todoCorrecto) {
    mensaje.textContent = '✅ Suscripción a MusicGo exitosa';
    mensaje.style.color = 'green';
    // LO QUE ME PEDISTE: se limpia solo como nuevo
    setTimeout(() => {
      form.reset();
      mensaje.textContent = '';
      document.querySelectorAll('input, select').forEach(c => c.classList.remove('invalido'));
      document.querySelectorAll('.error').forEach(s => s.textContent = '');
    }, 2500);
  } else {
    mensaje.textContent = 'Revisa los campos marcados en rojo.';
    mensaje.style.color = '#d93025';
  }
});
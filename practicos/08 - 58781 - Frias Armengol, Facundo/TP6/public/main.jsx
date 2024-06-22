import React, { useState } from 'react';

const Aplicacion = () => {
    const [mensaje, setMensaje] = useState("");
    const [formData, setFormData] = useState({ usuario: "", contraseña: "" });
    const [registro, setRegistro] = useState(false);
    const [logueado, setLogueado] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");

    const validarCampos = () => {
        if (!formData.usuario || !formData.contraseña) {
            setMensaje("Por favor ingrese los datos.");
            return false;
        }
        return true;
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (!validarCampos()) return;

        const endpoint = registro ? "/registrador" : "/iniciar sesión";
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario: formData.usuario,
                    contraseña: formData.contraseña,
                }),
            });
            const data = await res.text();
            setMensaje(data);
            if (res.ok) {
                setFormData({ usuario: "", contraseña: "" });
                if (registro) {
                    setRegistro(false);
                } else {
                    setLogueado(true);
                    setNombreUsuario(formData.usuario);
                }
            }
        } catch (error) {
            console.error(Error al ${registro ? "registrar" : "iniciar sesión"}:, error);
            setMensaje(Error al ${registro ? "registrar" : "iniciar sesión"});
        }
    };

    const cerrarSesion = async () => {
        try {
            const res = await fetch("/cerrar sesión", {
                method: "PUT",
                credentials: "include",
            });
            const data = await res.text();
            setMensaje(data);
            if (res.ok) {
                setFormData({ usuario: "", contraseña: "" });
                setLogueado(false);
                setNombreUsuario("");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setMensaje("Error al cerrar sesión");
        }
    };

    const obtenerInfo = async () => {
        try {
            const res = await fetch("/info", {
                method: "GET",
                credentials: "include",
            });
            if (res.ok) {
                setMensaje(¡Bienvenido ${nombreUsuario}! Estás logueado.);
            } else {
                setMensaje("¡Usuario no encontrado!");
            }
        } catch (error) {
            console.error("Error al buscar los datos del usuario:", error);
            setMensaje("Error al buscar los datos del usuario");
        }
    };

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <div className="contenedor">
                {logueado ? (
                    <>
                        <button className="btns" onClick={cerrarSesion}>
                            Cerrar Sesión
                        </button>
                        <button className="btns" onClick={obtenerInfo}>
                            Datos de usuario
                        </button>
                    </>
                ) : (
                    <>
                        <form onSubmit={manejarSubmit} autoComplete="off">
                            <h2 className="hder">
                                {registro ? "Registrador" : "Iniciar Sesión"}
                            </h2>
                            <input
                                className="entrada"
                                type="text"
                                placeholder="Usuario"
                                value={formData.usuario}
                                onChange={(e) =>
                                    setFormData({ ...formData, usuario: e.target.value })
                                }
                                autoComplete="username"
                            />
                            <input
                                className="entrada"
                                type="password"
                                placeholder="Contraseña"
                                value={formData.contraseña}
                                onChange={(e) =>
                                    setFormData({ ...formData, contraseña: e.target.value })
                                }
                                autoComplete={registro ? "new-password" : "current-password"}
                            />
                            <button type="submit" className="btns">
                                {registro ? "Registrador" : "Iniciar Sesión"}
                            </button>
                        </form>
                        <button className="btns2" onClick={() => setRegistro(!registro)}>
                            {registro ? "Iniciar Sesión" : "Registrarse"}
                        </button>
                    </>
                )}

                <div id="mensaje">{mensaje}</div>
            </div>
        </div>
    );
};

export default Aplicacion;
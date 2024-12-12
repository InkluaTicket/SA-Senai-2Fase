import React, { useEffect, useState } from 'react';
import '../styles/VisualizarPerfilUsuario.css';
import NavbarPerfil from './NavbarPerfil';
import { useParams } from 'react-router-dom';

function VisualizarPerfilUsuario() {
  const { id_usuario } = useParams(); // Obtém o ID do usuário da URL
  const [isCheckedTrue, setChecked] = useState(false);
  const [isCheckedFalse, setCheckedFalse] = useState(false);
  const [Pcd, setPcd] = useState(false);
  const [User, setUser] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/perfil/${id_usuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
      } else {
        console.error('Erro ao buscar o usuário:', response.statusText);
      }
    } catch (err) {
      console.error('Erro ao buscar usuário:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id_usuario]);

  useEffect(() => {
    if (User.possui_deficiencia) {
      setChecked(true);
      setCheckedFalse(false);
      setPcd(true);
    } else {
      setCheckedFalse(true);
      setChecked(false);
      setPcd(false);
    }
  }, [User]);

  return (
    <>
      <NavbarPerfil />
      <div className="Corpo-containerUser">
        <div className="divUmUser">
          <div className="posidivUmUser">
            <div className="ImagemENomeUser">
              {User.foto_perfil ? (
                <img
                  src={User.foto_perfil}
                  className="iconUser"
                  style={{ borderRadius: '50%' }}
                  alt="Foto de Perfil"
                />
              ) : (
                <img className="iconUser" src="/img/fotoUser.png" alt="Ícone Usuário" />
              )}

              {Pcd && <img className="verificado1User" src="/img/img logo.png" alt="Verificado" />}
              <p tabIndex={0} style={{marginRight: '-140px'}} aria-label="Nome de usuário" className="nomeUser">
                {User.nome || 'Usuário Não Identificado'}
              </p>
            </div>
            <label tabIndex={0} className="possuiDeficienciaUser">
              Possui alguma deficiência?
            </label>
            <img className="verificado2User" src="/img/img logo.png" alt="" />

            <div className="checkBoxGroupUser">
              <div>
                <input
                  type="checkbox"
                  aria-disabled="true"
                  checked={isCheckedTrue}
                  className="checkBoxUser"
                  id="sim"
                />
                <label htmlFor="simUser">Sim</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  aria-disabled="true"
                  checked={isCheckedFalse}
                  className="checkBoxUser"
                  id="nao"
                />
                <label htmlFor="naoUser">Não</label>
              </div>
            </div>

            <label className="deficienciaUser">Deficiência:</label>
            <input
              tabIndex={0}
              className="inptsUser"
              aria-disabled="true"
              value={Pcd ? User.deficiencia : 'Não possui'}
              type="text"
            />

            <label className="detalhesUser">Detalhes:</label>
            <input
              tabIndex={0}
              className="inptsUser"
              aria-disabled="true"
              value={Pcd ? User.detalhes_deficiencia : 'Não possui'}
              type="text"
            />
          </div>
        </div>

        <div className="divDoisUser">
          <img src="/img/img usuario.png" className="imagemsUmPerfil" alt="Detalhes" />
        </div>
      </div>
    </>
  );
}

export default VisualizarPerfilUsuario;

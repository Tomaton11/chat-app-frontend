import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ENVIROMENT from '../config/enviroment';
import { jwtDecode } from "jwt-decode";

const WorkspaceScreen = () => {
	const { id } = useParams();
	const [workspace, setWorkspace] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// estado para canales
	const [channels, setChannels] = useState([]);
	const [channelName, setChannelName] = useState('');
	const [channelError, setChannelError] = useState(null);
	const [channelLoading, setChannelLoading] = useState(false);

	const navigate = useNavigate();

	// Obtener el userId del token
	const token = localStorage.getItem("authorization_token");
	const decoded = token ? jwtDecode(token) : null;
	const userId = decoded?._id; // ESTA es la key correcta


	// obtener info del worksace
	useEffect(() => {
		const fetchWorkspace = async () => {
			try {
				const token = localStorage.getItem('authorization_token');

				const res = await fetch(`${ENVIROMENT.URL_API}/api/workspaces/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				const data = await res.json();

				if (res.ok) {
					setWorkspace(data.data.workspace);
				} else {
					setError(data.message || 'Error al cargar workspace');
				}

			} catch (err) {
				console.error(err);
				setError('Error de conexión con el servidor');
			} finally {
				setLoading(false);
			}
		};

		fetchWorkspace();
	}, [id]);

	// crear canal nuevo
	const handleCreateChannel = async (e) => {
		e.preventDefault();
		if (!channelName.trim()) return;

		try {
			setChannelLoading(true);
			setChannelError(null);

			const token = localStorage.getItem('authorization_token');

			const res = await fetch(`${ENVIROMENT.URL_API}/api/channels/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name: channelName.trim() }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Error al crear canal');
			}

			// intento de leer el canal devuelto en distintas formas
			const newChannel =
				data?.data?.channel || data?.channel || data?.data || null;

			if (newChannel) {
				setChannels((prev) => [...prev, newChannel]);
			}

			setChannelName('');
		} catch (err) {
			console.error(err);
			setChannelError(err.message);
		} finally {
			setChannelLoading(false);
		}
	};



	if (loading) return <p>Cargando workspace...</p>;
	if (error) return <p style={{ color: 'red' }}>{error}</p>;
	if (!workspace) return <p>No se encontró el Workspace</p>

	return (
		<div style={{display: 'flex', height: '100vh' }}>
			{/* sidebar */}
			<aside
				width: '260',
				borderRight: '1px solid #ddd'
			></aside>		</div>
	)

		














export default WorkspaceScreen;

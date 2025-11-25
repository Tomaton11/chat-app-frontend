import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ResetPasswordScreen from './Screens/ResetPasswordScreen'
import RewritePasswordScreen from './Screens/RewritePasswordScreen'
import ProtectedRoute from './Components/ProptectedRoute'
import HomeScreen from './Screens/home'
import CrearWorkspace from './Screens/Workspaces'
import WorkspaceScreen from './Screens/WorkspaceScreen'

// 🚫 Eliminamos las referencias a Login y Dashboard que no estaban importadas

function App() {
    return (
        <div>
            <Routes>
                {/* Rutas publicas */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/reset-password" element={<ResetPasswordScreen />} />
                <Route path="/rewrite-password" element={<RewritePasswordScreen />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home/:userId" element={<HomeScreen />} />
                    <Route path="/register-workspace" element={<CrearWorkspace />} />
                    <Route path="/workspace/:id" element={<WorkspaceScreen />} />
                </Route>
                
                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    )
}

export default App
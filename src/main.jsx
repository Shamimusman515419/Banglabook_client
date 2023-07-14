import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { RouterProvider } from 'react-router-dom'
import Route from './routes/Route/Route'
import AuthProvider from './Component/Authprovider/Authprovider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div >
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <RouterProvider router={Route}> </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
      
    </div>

  </React.StrictMode>,
)

import { createContext, useContext } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import env from './app/config/env'
import { Repository } from './domain/repositories/repository'
import { AuthenticationFetchRepository } from './infra/repositories/fetch/authentication-fetch-repository'
import { Foods } from './app/components/food/Foods'
import { Sidebar } from './app/components/layout/Sidebar'
import { AddFood } from './app/components/food/AddFood'
import { Food } from './app/components/food/Food'
import { EditFood } from './app/components/food/EditFood'
import { SignIn } from './app/components/auth/sign-in/SignIn'

export type AppManager = {
  repository: Repository
}

const app: AppManager = {
  repository: {
    auth: new AuthenticationFetchRepository(env.serverHostAddress)
  }
}

export const AppContext = createContext(app)

export const useApp = () => {
  return useContext(AppContext)
}

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={new QueryClient()}>
        <AppContext.Provider value={app}>
          <BrowserRouter>
            <Routes>
              <Route path='auth'>
                <Route path='sign-in' element={<SignIn/>} />
              </Route>
              <Route path='/' element={<Sidebar/>}>
                <Route path='foods'>
                  <Route index element={<Foods />}/>
                  <Route path='new' element={<AddFood/>}/>
                  <Route path=':foodId'>
                    <Route index element={<Food/>}/>
                    <Route path='edit' element={<EditFood/>}/>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;

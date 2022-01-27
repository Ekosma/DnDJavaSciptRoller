Rails.application.routes.draw do

  

  post 'login', to: 'auth#login'
  post 'signup', to: 'auth#signup'

  
  resources :characters do 
    resources :users
  end

  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

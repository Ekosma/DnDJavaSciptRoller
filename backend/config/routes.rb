Rails.application.routes.draw do

  #root "application#index"

  post 'new', to: 'application#create'
  post 'login', to: 'application#login'
  post 'characters', to: 'characters#create'
  
  resources :characters 
  #end
  resources :users do
    resources :characters
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

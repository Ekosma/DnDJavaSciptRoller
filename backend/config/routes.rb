Rails.application.routes.draw do

  #root "application#index"

  post 'new', to: 'application#create'
  #post 'signup', to: 'application#signup'

  
  #resources :characters do 
    #resources :users
  #end
  resources :users do
    resources :characters
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

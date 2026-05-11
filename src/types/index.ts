//type usuado para los datos del usuario

export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string,
  image: string,
  links: string
  
};

export type UserUpdate = Pick<User , 'handle' >&{
  description?: User['description']
}

export type UserHandle = Pick<User, 'handle' | 'description' | 'image' | 'links' | 'name'> 


export type RegisterForm  = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string;
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
  password : string;
}

export type ProfileForm = Pick<User, 'handle' | 'description'>




export type SocialNetwork = {
  id: number,
  name: string,
  url: string,
  enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>
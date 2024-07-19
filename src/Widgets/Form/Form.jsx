import './Form.scss'

const FormTitulo = ({children}) => {

    return (
        <label className='form-titulo'>{children}</label>
    )
}

const FormInputText = ({labelText, placeholder, onChange, value}) => {

    return (
        <div className='form-input-text'>
            <label className='form-label'>{labelText}</label>
            <input type='text' placeholder={placeholder} onChange={onChange} value={value} required></input>
        </div>
    )
}

const FormInputFile = ({labelText, accept, onChange, placeholder, textoBotao}) => {

    return (
        
        <div>
            <label className='form-label'>{labelText}</label>
            <input
                type='file'
                accept={accept}
                onChange={onChange}
                id='file'
            />
            <label htmlFor='file' className='form-input-file'>
                <span className='form-input-file-text'>{placeholder}</span>
                <span className='form-input-file-button'>{textoBotao}</span>
            </label>
        </div>
    )
}

const FormInputUsername = ({placeholder, userRef, onChange, value}) => {

    return (
        <div className='form-input-username'>
            <label htmlFor='username'>Username</label>
            <input placeholder={placeholder} type='text' id='username' ref={userRef} autoComplete='off' onChange={onChange} value={value} required/>
        </div>
    )
}

const FormInputPassword = ({placeholder, onChange, value}) => {

    return (
        <div className='form-input-password'>
            <label htmlFor='password'>Senha</label>
            <input placeholder={placeholder} type='password' id='password' onChange={onChange} value={value} required/>
        </div>
    )
}

export {FormTitulo, FormInputText, FormInputFile, FormInputUsername, FormInputPassword};
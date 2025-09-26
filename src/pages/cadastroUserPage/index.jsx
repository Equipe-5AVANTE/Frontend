import { useState } from 'react'

import api from '../../api'

function CadastroUser() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    specialty: '',
    role: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Enums
  const RolesType = {
    DOCTOR: 'DOCTOR',
    ATTENDANT: 'ATTENDANT'
  }

  const Specialty = {
    DrCARDIOLOGIA: 'DrCARDIOLOGIA',
    DrDERMATOLOGIA: 'DrDERMATOLOGIA',
    DrGINECOLOGIA: 'DrGINECOLOGIA',
    DrORTOPEDIA: 'DrORTOPEDIA',
    DrPEDIATRIA: 'DrPEDIATRIA',
    EMFERMEIRO: 'EMFERMEIRO',
    ATTENDANT: 'ATTENDANT'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!formData.specialty) {
      newErrors.specialty = 'Especialidade é obrigatória'
    }

    if (!formData.role) {
      newErrors.role = 'Função é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Chamada para API usando axios
      console.log('Dados do formulário:', formData)
      
      const response = await api.post('/user', formData)
      
      console.log('Resposta da API:', response.data)
      alert('Usuário cadastrado com sucesso!')
      
      // Limpar formulário após sucesso
      setFormData({
        fullName: '',
        email: '',
        password: '',
        specialty: '',
        role: ''
      })
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      
      if (error.response) {
        // Erro da API
        alert(`Erro ao cadastrar usuário: ${error.response.data.message || 'Erro desconhecido'}`)
      } else if (error.request) {
        // Erro de rede
        alert('Erro de conexão. Verifique sua internet e tente novamente.')
      } else {
        // Outro tipo de erro
        alert('Erro inesperado. Tente novamente.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0 text-center">Cadastro de Usuário</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Nome Completo */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Nome Completo <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Digite o nome completo"
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Digite o email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Senha */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Senha <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Digite a senha"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                {/* Especialidade */}
                <div className="mb-3">
                  <label htmlFor="specialty" className="form-label">
                    Especialidade <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.specialty ? 'is-invalid' : ''}`}
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione uma especialidade</option>
                    {Object.values(Specialty).map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  {errors.specialty && (
                    <div className="invalid-feedback">{errors.specialty}</div>
                  )}
                </div>

                {/* Função */}
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Função <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione uma função</option>
                    {Object.values(RolesType).map(role => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <div className="invalid-feedback">{errors.role}</div>
                  )}
                </div>

                {/* Botões */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        email: '',
                        password: '',
                        specialty: '',
                        role: ''
                      })
                      setErrors({})
                    }}
                  >
                    Limpar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Cadastrando...
                      </>
                    ) : (
                      'Cadastrar Usuário'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  )
}

export default CadastroUser


<template>
  <div class="accueil-container">
    <!-- Navbar fixe -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <!-- Logo ConnectiQ avec design moderne -->
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#007bff;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0056b3;stop-opacity:1" />
              </linearGradient>
            </defs>
            
            <!-- Icône de connexion/réseau -->
            <circle cx="15" cy="25" r="4" fill="url(#logoGradient)"/>
            <circle cx="35" cy="15" r="4" fill="url(#logoGradient)"/>
            <circle cx="35" cy="35" r="4" fill="url(#logoGradient)"/>
            <line x1="19" y1="25" x2="31" y2="15" stroke="url(#logoGradient)" stroke-width="2"/>
            <line x1="19" y1="25" x2="31" y2="35" stroke="url(#logoGradient)" stroke-width="2"/>
            
            <!-- Texte ConnectiQ -->
            <text x="50" y="20" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="url(#logoGradient)">ConnectiQ</text>
            <text x="50" y="35" font-family="Arial, sans-serif" font-size="8" fill="#6c757d">Transport Analytics</text>
          </svg>
        </div>
        <div class="nav-menu">
          <button 
            class="nav-button" 
            :class="{ active: currentSection === 'accueil' }"
            @click="showSection('accueil')"
          >
            Accueil
          </button>
          <button 
            class="nav-button" 
            :class="{ active: currentSection === 'apropos' }"
            @click="showSection('apropos')"
          >
            À propos
          </button>
          <button 
            class="nav-button" 
            :class="{ active: currentSection === 'contact' }"
            @click="showSection('contact')"
          >
            Contact
          </button>
          <button 
            class="nav-button login-btn" 
            :class="{ active: currentSection === 'connexion' }"
            @click="showSection('connexion')"
          >
            Connexion
          </button>
        </div>
        
        <!-- Menu mobile -->
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
          <button class="mobile-nav-button" @click="showSection('accueil')">Accueil</button>
          <button class="mobile-nav-button" @click="showSection('apropos')">À propos</button>
          <button class="mobile-nav-button" @click="showSection('contact')">Contact</button>
          <button class="mobile-nav-button" @click="showSection('connexion')">Connexion</button>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="main-content">
      <!-- Section Accueil -->
      <section v-if="currentSection === 'accueil'" class="section accueil-section">
        <div class="hero-container">
          <div class="hero-content">
            <div class="logo-insight">
              <h1>INSIGHT</h1>
              <div class="logo-subtitle">Transport Analytics</div>
            </div>
            
            <h2 class="hero-title">
              Système de structuration et d'analyse marketing des transporteurs et expéditeurs
            </h2>
            
            <div class="hero-description">
              <p>
                Optimisez vos opérations de transport avec notre solution innovante d'analyse et de structuration marketing. 
                ConnectiQ vous accompagne dans la digitalisation de votre activité logistique.
              </p>
            </div>
            
            <div class="cta-buttons">
              <button class="cta-primary" @click="showSection('apropos')">
                Découvrir notre solution
              </button>
              <button class="cta-secondary" @click="showSection('contact')">
                Nous contacter
              </button>
            </div>
          </div>
          
          <div class="hero-features">
            <div class="feature-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-6h2v20h-2V1zm4 8h2v12h-2V9zm4-4h2v16h-2V5z"/>
                </svg>
              </div>
              <h3>Analyse de données</h3>
              <p>Tableaux de bord interactifs pour suivre vos performances</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3>Gestion des transports</h3>
              <p>Optimisation des routes et planification intelligente</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
              </div>
              <h3>Marketing ciblé</h3>
              <p>Stratégies personnalisées pour développer votre clientèle</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section À propos -->
      <section v-if="currentSection === 'apropos'" class="section apropos-section">
        <div class="section-container">
          <h2 class="section-title">À propos de ConnectiQ</h2>
          
          <div class="apropos-content">
            <div class="apropos-text">
              <h3>Notre Mission</h3>
              <p>
                ConnectiQ révolutionne le secteur du transport et de la logistique en proposant des solutions 
                technologiques avancées pour la structuration et l'analyse marketing des entreprises de transport.
              </p>
              
              <h3>Notre Vision</h3>
              <p>
                Devenir le partenaire de référence pour la transformation numérique des transporteurs et expéditeurs 
                à Madagascar et dans l'Océan Indien.
              </p>
              
              <h3>Nos Services</h3>
              <ul>
                <li>Analyse de performance et de rentabilité</li>
                <li>Optimisation des circuits de distribution</li>
                <li>Stratégies marketing personnalisées</li>
                <li>Formation et accompagnement</li>
                <li>Solutions digitales sur mesure</li>
              </ul>
            </div>
            
            <div class="apropos-stats">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Clients satisfaits</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Satisfaction</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Contact -->
      <section v-if="currentSection === 'contact'" class="section contact-section">
        <div class="section-container">
          <h2 class="section-title">Contactez-nous</h2>
          
          <div class="contact-content">
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                </div>
                <div class="contact-details">
                  <h3>Entreprise</h3>
                  <p>ConnectiQ</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div class="contact-details">
                  <h3>Email</h3>
                  <p>connectiQ-Info@gmail.com</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div class="contact-details">
                  <h3>Téléphone</h3>
                  <p>+261 34 65 182 56</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div class="contact-details">
                  <h3>Facebook</h3>
                  <p>CYBER CONNECTIQ</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div class="contact-details">
                  <h3>Adresse</h3>
                  <p>Ambatotokana, à côté du lycée Diamant</p>
                </div>
              </div>
            </div>
            
            <div class="contact-form">
              <h3>Envoyez-nous un message</h3>
              <form @submit.prevent="sendMessage">
                <div class="form-group">
                  <input type="text" v-model="contactForm.name" placeholder="Votre nom" required>
                </div>
                
                <div class="form-group">
                  <input type="email" v-model="contactForm.email" placeholder="Votre email" required>
                </div>
                
                <div class="form-group">
                  <textarea v-model="contactForm.message" placeholder="Votre message" required></textarea>
                </div>
                
                <button type="submit" class="submit-btn">Envoyer le message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Connexion -->
      <section v-if="currentSection === 'connexion'" class="section connexion-section">
        <div class="section-container">
          <div class="auth-container">
            <div class="auth-tabs">
              <button 
                class="auth-tab" 
                :class="{ active: authMode === 'login' }"
                @click="authMode = 'login'"
              >
                Connexion
              </button>
              <button 
                class="auth-tab" 
                :class="{ active: authMode === 'register' }"
                @click="authMode = 'register'"
              >
                Inscription
              </button>
            </div>
            
            <!-- Formulaire de connexion -->
            <form v-if="authMode === 'login'" @submit.prevent="handleLogin" class="auth-form">
              <h2 class="auth-title">Se connecter</h2>
              
              <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input 
                  type="text" 
                  id="username" 
                  v-model="loginForm.username" 
                  placeholder="Entrez votre nom d'utilisateur" 
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="loginForm.password" 
                  placeholder="Entrez votre mot de passe" 
                  required
                >
              </div>
              
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="loginForm.rememberMe">
                  Se souvenir de moi
                </label>
                
                <a href="#" class="forgot-password">Mot de passe oublié ?</a>
              </div>
              
              <button type="submit" class="auth-btn-submit">Se connecter</button>
              
              <!-- Comptes de test -->
              <div class="test-accounts">
                <h4>Comptes de test :</h4>
                <p><strong>Admin :</strong> admin / admin123</p>
                <p><strong>Utilisateur :</strong> user / user123</p>
              </div>
            </form>
            
            <!-- Formulaire d'inscription -->
            <form v-if="authMode === 'register'" @submit.prevent="handleRegister" class="auth-form">
              <h2 class="auth-title">Créer un compte</h2>
              
              <div class="form-group">
                <label for="reg-name">Nom complet</label>
                <input 
                  type="text" 
                  id="reg-name" 
                  v-model="registerForm.name" 
                  placeholder="Entrez votre nom complet" 
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="reg-email">Email</label>
                <input 
                  type="email" 
                  id="reg-email" 
                  v-model="registerForm.email" 
                  placeholder="Entrez votre email" 
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="reg-username">Nom d'utilisateur</label>
                <input 
                  type="text" 
                  id="reg-username" 
                  v-model="registerForm.username" 
                  placeholder="Choisissez un nom d'utilisateur" 
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="reg-role">Rôle</label>
                <select 
                  id="reg-role" 
                  v-model="registerForm.role" 
                  required
                  class="role-select"
                >
                  <option value="utilisateur">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="reg-password">Mot de passe</label>
                <input 
                  type="password" 
                  id="reg-password" 
                  v-model="registerForm.password" 
                  placeholder="Créez un mot de passe" 
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="reg-confirm-password">Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  id="reg-confirm-password" 
                  v-model="registerForm.confirmPassword" 
                  placeholder="Confirmez votre mot de passe" 
                  required
                >
              </div>
              
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="registerForm.acceptTerms" required>
                  J'accepte les <a href="#" class="terms-link">conditions d'utilisation</a>
                </label>
              </div>
              
              <button type="submit" class="auth-btn-submit">S'inscrire</button>
            </form>
            
            <div class="auth-footer">
              <p v-if="authMode === 'login'">
                Pas encore de compte ? 
                <a href="#" @click="authMode = 'register'">Créer un compte</a>
              </p>
              <p v-if="authMode === 'register'">
                Déjà un compte ? 
                <a href="#" @click="authMode = 'login'">Se connecter</a>
              </p>
              <p>
                Besoin d'aide ? <a href="#" @click="showSection('contact')">Contactez-nous</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Message de confirmation -->
    <div v-if="showMessage" class="message-overlay" @click="showMessage = false">
      <div class="message-content">
        <p>{{ messageText }}</p>
        <button @click="showMessage = false">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// États réactifs
const currentSection = ref('accueil')
const mobileMenuOpen = ref(false)
const showMessage = ref(false)
const messageText = ref('')
const authMode = ref('login')

// Données de test pour l'authentification
const testUsers = ref([
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Administrateur Test',
    email: 'admin@connectiq.com'
  },
  {
    username: 'user',
    password: 'user123',
    role: 'utilisateur',
    name: 'Utilisateur Test',
    email: 'user@connectiq.com'
  }
])

// Utilisateurs enregistrés (simulation base de données)
const registeredUsers = ref([...testUsers.value])

// Formulaires
const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false
})

const registerForm = ref({
  name: '',
  email: '',
  username: '',
  role: 'utilisateur', // Valeur par défaut
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

// Méthodes
const showSection = (section: string) => {
  currentSection.value = section
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Simulation d'API - Authentification
const authenticateUser = (username: string, password: string) => {
  return registeredUsers.value.find(user => 
    user.username === username && user.password === password
  )
}

// Redirection selon le rôle
const redirectUserByRole = (role: string) => {
  if (role === 'admin') {
    router.push('/admin')
  } else if (role === 'utilisateur') {
    router.push('/user')
  }
}

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    messageText.value = 'Veuillez remplir tous les champs.'
    showMessage.value = true
    return
  }

  messageText.value = 'Connexion en cours...'
  showMessage.value = true
  
  // Simulation d'appel API
  setTimeout(() => {
    const user = authenticateUser(loginForm.value.username, loginForm.value.password)
    
    if (user) {
      // Sauvegarde des informations utilisateur (simulation)
      if (loginForm.value.rememberMe) {
        localStorage.setItem('connectedUser', JSON.stringify({
          username: user.username,
          role: user.role,
          name: user.name
        }))
      } else {
        sessionStorage.setItem('connectedUser', JSON.stringify({
          username: user.username,
          role: user.role,
          name: user.name
        }))
      }
      
      messageText.value = `Connexion réussie ! Redirection vers ${user.role === 'admin' ? 'le tableau de bord administrateur' : 'l\'espace utilisateur'}...`
      
      // Redirection selon le rôle après 1.5 secondes
      setTimeout(() => {
        showMessage.value = false
        redirectUserByRole(user.role)
      }, 1500)
      
      // Réinitialiser le formulaire
      loginForm.value = {
        username: '',
        password: '',
        rememberMe: false
      }
      
    } else {
      messageText.value = 'Nom d\'utilisateur ou mot de passe incorrect.'
    }
  }, 1000)
}

const handleRegister = async () => {
  // Validation des champs
  if (!registerForm.value.name || !registerForm.value.email || 
      !registerForm.value.username || !registerForm.value.password || 
      !registerForm.value.acceptTerms) {
    messageText.value = 'Veuillez remplir tous les champs et accepter les conditions.'
    showMessage.value = true
    return
  }
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    messageText.value = 'Les mots de passe ne correspondent pas.'
    showMessage.value = true
    return
  }

  // Vérifier si l'utilisateur existe déjà
  if (registeredUsers.value.find(user => user.username === registerForm.value.username)) {
    messageText.value = 'Ce nom d\'utilisateur existe déjà.'
    showMessage.value = true
    return
  }

  if (registeredUsers.value.find(user => user.email === registerForm.value.email)) {
    messageText.value = 'Cette adresse email est déjà utilisée.'
    showMessage.value = true
    return
  }
  
  messageText.value = 'Inscription en cours...'
  showMessage.value = true
  
  // Simulation d'appel API d'inscription
  setTimeout(() => {
    // Ajouter le nouvel utilisateur
    const newUser = {
      username: registerForm.value.username,
      password: registerForm.value.password,
      role: registerForm.value.role,
      name: registerForm.value.name,
      email: registerForm.value.email
    }
    
    registeredUsers.value.push(newUser)
    
    messageText.value = `Inscription réussie ! Compte ${registerForm.value.role} créé. Vous pouvez maintenant vous connecter.`
    
    // Passer au mode connexion
    setTimeout(() => {
      authMode.value = 'login'
      // Réinitialiser le formulaire
      registerForm.value = {
        name: '',
        email: '',
        username: '',
        role: 'utilisateur',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      }
    }, 2000)
    
  }, 1000)
}

const sendMessage = () => {
  if (contactForm.value.name && contactForm.value.email && contactForm.value.message) {
    messageText.value = 'Message envoyé avec succès ! Nous vous répondrons bientôt.'
    showMessage.value = true
    
    // Réinitialiser le formulaire
    contactForm.value = { name: '', email: '', message: '' }
  }
}

onMounted(() => {
  // Animations au chargement
  const elements = document.querySelectorAll('.feature-card')
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-in')
    }, index * 200)
  })
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.accueil-container {
  width: 100vw;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(0, 86, 179, 0.2) 100%),
              url('https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover;
  color: #333;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  padding-left: 0;
  padding-right: 0;
}

.nav-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 0;
}

.nav-logo svg {
  width: 180px;
  height: 40px;
}

.nav-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-shrink: 0;
  margin-right: 0;
}

.nav-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #333;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-button.active {
  background: #007bff;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}

.login-btn {
  background: #28a745 !important;
  color: white !important;
}

.login-btn:hover {
  background: #218838 !important;
}

/* Menu mobile */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: #007bff;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
}

.mobile-menu.active {
  display: flex;
}

.mobile-nav-button {
  background: transparent;
  border: none;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 8px;
  margin: 0.2rem 0;
  transition: all 0.3s ease;
}

.mobile-nav-button:hover {
  background: rgba(0, 123, 255, 0.1);
}

/* Contenu principal */
.main-content {
  width: 100%;
  height: auto;
  min-height: calc(100vh - 80px);
  padding-top: 80px;
}

.section {
  min-height: calc(100vh - 80px);
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.6s ease-in-out;
  box-sizing: border-box;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #007bff;
  text-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
}

/* Section Accueil */
.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  box-sizing: border-box;
}

.hero-content {
  margin-bottom: 4rem;
}

.logo-insight {
  margin-bottom: 2rem;
}

.logo-insight h1 {
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(45deg, #007bff, #0056b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
  margin-bottom: 0.5rem;
}

.logo-subtitle {
  font-size: 1.2rem;
  color: #b4bac5;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-title {
  font-size: 2.5rem;
  color: #333;
  margin: 2rem 0;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-description {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.hero-description p {
  font-size: 1.3rem;
  color: #484d51;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.cta-primary, .cta-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-primary {
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}

.cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 123, 255, 0.6);
}

.cta-secondary {
  background: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.cta-secondary:hover {
  background: #007bff;
  color: white;
  transform: translateY(-3px);
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.feature-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-icon svg {
  width: 48px;
  height: 48px;
  fill: #007bff;
}

.feature-card h3 {
  color: #007bff;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.feature-card p {
  color: #6c757d;
  line-height: 1.5;
}

/* Section À propos */
.apropos-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.apropos-text h3 {
  color: #007bff;
  margin: 2rem 0 1rem 0;
  font-size: 1.8rem;
}

.apropos-text p {
  color: #3b3939;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.apropos-text ul {
  list-style: none;
  padding-left: 0;
}

.apropos-text li {
  color: #323435;
  margin: 0.8rem 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: 1.1rem;
}

.apropos-text li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: bold;
}

.apropos-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 123, 255, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Section Contact */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.2);
}

.contact-icon {
  font-size: 2rem;
  margin-right: 1rem;
  width: 60px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-icon svg {
  width: 32px;
  height: 32px;
  fill: #007bff;
}

.contact-details h3 {
  color: #007bff;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.contact-details p {
  color: #6c757d;
  font-size: 1rem;
}

.contact-form {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-form h3 {
  color: #007bff;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.role-select {
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 123, 255, 0.4);
}

/* Section Connexion */
.auth-container {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.auth-tab {
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #6c757d;
}

.auth-tab.active {
  background: #007bff;
  color: white;
}

.auth-tab:hover:not(.active) {
  background: rgba(0, 123, 255, 0.1);
}

.auth-form {
  width: 100%;
}

.auth-form .form-group {
  margin-bottom: 2rem;
}

.auth-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  color: #6c757d;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 0.5rem;
}

.forgot-password,
.terms-link {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover,
.terms-link:hover {
  text-decoration: underline;
}

.auth-btn-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #28a745, #1e7e34);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.auth-btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(40, 167, 69, 0.4);
}

.test-accounts {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 123, 255, 0.2);
}

.test-accounts h4 {
  color: #007bff;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.test-accounts p {
  color: #6c757d;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.auth-footer a {
  color: #007bff;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.auth-footer p {
  margin: 0.5rem 0;
}

/* Message overlay */
.message-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.message-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  margin: 1rem;
}

.message-content button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
    pointer-events: auto;
    margin-right: 1rem;
  }
  
  .nav-logo svg {
    width: 140px;
    height: 32px;
  }
  
  .nav-container {
    padding: 1rem 0;
    margin: 0 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .logo-insight h1 {
    font-size: 2.5rem;
  }
  
  .hero-features {
    grid-template-columns: 1fr;
  }
  
  .apropos-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .apropos-stats {
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
  }
  
  .stat-item {
    min-width: 150px;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-primary, .cta-secondary {
    width: 100%;
    max-width: 300px;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 1rem;
  }
  
  .nav-logo svg {
    width: 120px;
    height: 28px;
  }
  
  .hero-container, 
  .section-container {
    padding: 1rem;
  }
  
  .hero-description p {
    font-size: 1.1rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .auth-container {
    padding: 2rem 1rem;
    margin: 1rem;
  }
  
  .contact-item {
    padding: 1rem;
  }
  
  .contact-icon {
    font-size: 1.5rem;
    width: 50px;
  }
}
</style>
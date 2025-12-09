// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // если есть

console.log('🚀 main.tsx запускается...')

const rootElement = document.getElementById('root')
console.log('📌 Найден root элемент:', rootElement)

if (!rootElement) {
  console.error('❌ ОШИБКА: Элемент #root не найден!')
  document.body.innerHTML = `
    <div style="
      color: red; 
      padding: 50px; 
      text-align: center;
      font-family: Arial;
    ">
      <h1>❌ Ошибка запуска</h1>
      <p>Элемент #root не найден в index.html</p>
      <p>Убедитесь что в index.html есть: <code>&lt;div id="root"&gt;&lt;/div&gt;</code></p>
    </div>
  `
} else {
  console.log('✅ Начинаем рендеринг React...')
  
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('✅ React успешно отрендерен!')
  } catch (error) {
    console.error('❌ Ошибка при рендере React:', error)
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px;">
        <h2>React Error:</h2>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `
  }
}
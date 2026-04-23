<template>
  <div class="about-page">
    <div class="container">
      <h1>О компании</h1>
      <div class="about-content">
        <div class="about-text">
          <h2>ДОМОСТРОЙ — строим качественно уже 10 лет</h2>
          <p>Мы предоставляем большой спектр услуг, от строительства частных домов до постройки особняков и ландшафтного проектирования.</p>
          <p>Наша команда профессионалов гарантирует высокое качество работ, соблюдение сроков и индивидуальный подход к каждому клиенту.</p>
          <div class="features">
            <div class="feature">
              <div>
                <strong>10+ лет</strong>
                <p>опыта на рынке</p>
              </div>
            </div>
            <div class="feature">
              <div>
                <strong>247+ объектов</strong>
                <p>построено</p>
              </div>
            </div>
            <div class="feature">
              <div>
                <strong>35+ сотрудников</strong>
                <p>профессионалов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.about-page {
  padding-top: 120px;
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  color: white;
}
.about-content {
  background: #1a1a1a;
  border-radius: 20px;
  padding: 3rem;
}
.about-text h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #c8a45d;
}
.about-text p {
  color: #aaa;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.feature {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  color: white;
}
.feature span {
  font-size: 1.5rem;
  color: #c8a45d;
}
.feature strong {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}
.feature p {
  margin: 0;
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  .about-content {
    padding: 1.5rem;
  }
}
</style>
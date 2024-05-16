def simular_esperanza_de_vida(esperanza_vida_inicial, edad_actual, num_simulaciones)
    vida_total = 0
  
    num_simulaciones.times do
      edad = edad_actual
      while rand > (1.0 / esperanza_vida_inicial)
        edad += 1
      end
      vida_total += edad
    end
  
    esperanza_vida_promedio = vida_total.to_f / num_simulaciones
    esperanza_vida_promedio
  end
  
  # Datos de entrada
  esperanza_vida_inicial = 8 # años
  edad_actual = 3 # años
  num_simulaciones = 10000
  
  # Calcular la nueva esperanza de vida
  esperanza_vida_promedio = simular_esperanza_de_vida(esperanza_vida_inicial, edad_actual, num_simulaciones)
  
  puts "La nueva esperanza de vida de la empresa es de #{esperanza_vida_promedio.round(2)} años."

  
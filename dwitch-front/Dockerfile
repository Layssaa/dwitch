# Etapa única: usar nginx para servir o build local
FROM nginx:stable-alpine AS runner

# Limpa conteúdo padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia apenas o build local já feito
COPY ./dwitch-front/dist /usr/share/nginx/html

# Expondo porta padrão do nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

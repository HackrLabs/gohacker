FROM nginx
MAINTAINER Danny Grove <danny@drgrovellc.com>
ADD dist /src/dist
COPY nginx.conf /etc/nginx/nginx.conf
#RUN \
#  chown -R nonroot:nonroot /src && \
#  chown -R nonroot:nonroot /usr/sbin/nginx && \
#  chown -R nonroot:nonroot /var/cache/nginx && \
#  chown -R nonroot:nonroot /var/log/nginx && \
#  chown nonroot:nonroot /var/log/nginx/nginx.log && \
#  chmod a+w /var/log/nginx/nginx.log && \
#  chown -R nonroot:nonroot /run

#USER nonroot
#ENV HOME /src
WORKDIR /src
#RUN \
#  mkdir -p /src/cache/proxy &&\
#  mkdir -p /src/cache/nginx
EXPOSE 9996
CMD ["nginx"]

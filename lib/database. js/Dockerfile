FROM quay.io/naveeddogar/GURUMD
RUN git clone https://github.com/GURUMD-TECH/WHITE-PANTHER-V6 /root/naveeddogar
WORKDIR /root/naveeddogar/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]

module.exports = {
  port: 3600,
  appEndpoint: "http://localhost:3600",
  apiEndpoint: "http://localhost:3600",
  jwt_secret: "jw3t_s3cr3t_3sks_2023_uskudar",
  jwt_expiration_in_seconds: 36000,
  environment: "dev",
  permissionLevels: {
    NORMAL_USER: 1,
    PAID_USER: 4,
    ADMIN: 2048,
  },
};

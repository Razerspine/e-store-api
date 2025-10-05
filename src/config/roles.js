const roles = {
  USER: [
    'read:public'
  ],
  ADMIN: [
    'read:products',
    'create:products',
    'update:products',
    'read:users',
    'create:users',
    'update:users',
    'upload:files',
    'delete:files'
  ],
  SUPER_ADMIN: ['*']
};

module.exports = roles;

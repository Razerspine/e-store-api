const roles = {
  user: [
    'read:public'
  ],
  admin: [
    'read:products',
    'create:products',
    'update:products',
    'read:users',
    'create:users',
    'update:users',
    'upload:files',
    'delete:files'
  ],
  super_admin: ['*']
};

module.exports = roles;

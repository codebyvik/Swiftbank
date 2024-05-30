"use strict";
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../config/connectToDB");
const auth = require("./auth");
const accounts = require("./accounts");
const transactions = require("./transactions");

const user = sequelize.define(
  "users",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "First Name cannot be null",
        },
        notEmpty: {
          msg: "First Name cannot be empty",
        },
      },
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Last Name cannot be null",
        },
        notEmpty: {
          msg: "Last Name cannot be empty",
        },
      },
    },
    email: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: {
          msg: "Email cannot be null",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
      },
      onUpdate: "CASCADE",
    },
    user_type: {
      allowNull: false,
      type: DataTypes.ENUM("customer", "admin"),
      validate: {
        notNull: {
          msg: "User type cannot be null",
        },
        notEmpty: {
          msg: "User type cannot be empty",
        },
      },
    },
    phone_pin: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Phone pin cannot be null",
        },
        notEmpty: {
          msg: "Phone pin cannot be empty",
        },
      },
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: {
          msg: "Phone number cannot be null",
        },
        notEmpty: {
          msg: "Phone number cannot be empty",
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    user_dateOfBirth: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "DOB cannot be null",
        },
        notEmpty: {
          msg: "DOB cannot be empty",
        },
      },
    },
    user_occupation: {
      allowNull: false,
      type: DataTypes.ENUM("salaried", "student", "unemployed", "others", "self employed"),
      validate: {
        notNull: {
          msg: "Profession  cannot be null",
        },
        notEmpty: {
          msg: "Profession cannot be empty",
        },
      },
    },
    user_maritalStatus: {
      allowNull: false,
      type: DataTypes.ENUM("married", "unmarried", "others"),
      validate: {
        notNull: {
          msg: "Marital status cannot be null",
        },
        notEmpty: {
          msg: "Marital status cannot be empty",
        },
      },
    },
    street: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Address:street cannot be null",
        },
        notEmpty: {
          msg: "Address:street cannot be empty",
        },
      },
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Address:city cannot be null",
        },
        notEmpty: {
          msg: "Address:city cannot be empty",
        },
      },
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Address:state cannot be null",
        },
        notEmpty: {
          msg: "Address:state cannot be empty",
        },
      },
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Address:country cannot be null",
        },
        notEmpty: {
          msg: "Address:country cannot be empty",
        },
      },
    },
    pincode: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Address:pincode cannot be null",
        },
        notEmpty: {
          msg: "Address:pincode cannot be empty",
        },
      },
    },
    nationality: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Nationality cannot be null",
        },
        notEmpty: {
          msg: "Nationality cannot be empty",
        },
      },
    },
    user_gender: {
      allowNull: false,
      type: DataTypes.ENUM("male", "female", "others"),
      validate: {
        notNull: {
          msg: "Gender cannot be null",
        },
        notEmpty: {
          msg: "Gender cannot be empty",
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    modelname: "users",
  }
);

user.hasOne(auth, {
  foreignKey: "user_id",
  type: DataTypes.UUID,
  onUpdate: "CASCADE",
});
user.hasOne(auth, {
  foreignKey: "email",
  type: DataTypes.STRING,
  onUpdate: "CASCADE",
});
user.hasOne(accounts, { foreignKey: "user_id", type: DataTypes.UUID, onUpdate: "CASCADE" });
user.hasMany(transactions, { foreignKey: "user_id", type: DataTypes.UUID, onUpdate: "CASCADE" });

auth.belongsTo(user, {
  foreignKey: "user_id",
  type: DataTypes.UUID,
});

auth.belongsTo(user, {
  foreignKey: "email",
  type: DataTypes.STRING,
});

accounts.belongsTo(user, {
  foreignKey: "user_id",
  type: DataTypes.UUID,
});

module.exports = user;

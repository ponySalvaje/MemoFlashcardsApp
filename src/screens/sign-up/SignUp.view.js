import {useContext, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {register} from '../../api/auth.api';
import {colors, semesters, universities} from '../../common/constants';
import CustomDropdown from '../../components/customerDropdown';
import CustomInputText from '../../components/customInputText';
import {AuthContext} from '../../store/auth-context';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [semester, setSemester] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [openUniversity, setOpenUniversity] = useState(false);
  const [universityItems, setUniversityItems] = useState(universities);

  const [openSemester, setOpenSemester] = useState(false);
  const [semesterItems, setSemesterItems] = useState(semesters);

  const [isRegistering, setIsRegistering] = useState(false);

  const authCtx = useContext(AuthContext);

  const buildRegisterDTO = () => {
    return {
      name: name,
      email: email,
      password: password,
    };
  };

  const handleRegister = async () => {
    if (isRegistering) return;
    setIsRegistering(true);
    try {
      const result = await register(buildRegisterDTO());
      authCtx.authenticate(result.data.token);
    } catch (error) {
      Alert.alert(
        '¡Ups! Algo salió mal',
        'Hubo un error al registrar el usuario',
      );
      setIsRegistering(false);
    }
  };

  const cancelRegister = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerFieldsContainer}>
        <View style={styles.registerField}>
          <CustomInputText
            label="Nombres y Apellidos"
            name="name"
            value={name}
            onChange={ev => setName(ev)}
          />
        </View>
        <View style={styles.registerField}>
          <CustomDropdown
            label="Universidad"
            value={university}
            open={openUniversity}
            items={universityItems}
            setOpen={setOpenUniversity}
            setValue={setUniversity}
            setItems={setUniversityItems}
            searchable={true}
            placeholder=""
          />
        </View>
        {openUniversity ? (
          <>
            <View style={styles.registerField}>
              <CustomInputText
                label="Soy un estudiante de"
                name="semester"
                value={semester}
                onChange={ev => setSemester(ev)}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.registerField}>
              <CustomDropdown
                label="Soy un estudiante de"
                value={semester}
                open={openSemester}
                items={semesterItems}
                setOpen={setOpenSemester}
                setValue={setSemester}
                setItems={setSemesterItems}
                searchable={false}
                placeholder=""
              />
            </View>
          </>
        )}
        <View style={styles.registerField}>
          <CustomInputText
            label="Correo electrónico"
            name="email"
            keyboardType="email-address"
            value={email}
            onChange={ev => setEmail(ev)}
          />
        </View>
        <View style={styles.registerField}>
          <CustomInputText
            label="Crea una contraseña"
            name="password"
            secureTextEntry={true}
            value={password}
            onChange={ev => setPassword(ev)}
          />
        </View>
        <View style={styles.registerField}>
          <CustomInputText
            label="Confirmar contraseña"
            name="password"
            secureTextEntry={true}
            value={confirmPassword}
            onChange={ev => setConfirmPassword(ev)}
          />
        </View>
        <View style={styles.bottomButtons}>
          <View style={[styles.bottomButton, styles.registerButton]}>
            <Pressable onPress={handleRegister} style={styles.registerButton}>
              <Text style={styles.buttonText}>Registrar</Text>
            </Pressable>
          </View>
          <View style={[styles.bottomButton, styles.cancelButton]}>
            <Pressable onPress={cancelRegister} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  registerFieldsContainer: {
    padding: 20,
  },
  registerField: {
    paddingBottom: 20,
  },
  bottomButtons: {
    marginTop: 0,
  },
  bottomButton: {
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: colors.danger,
  },
});

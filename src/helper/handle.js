export const handleSuccessSignup = () => {
    setLoading(false);
    navigation.push('LogIn');

    setTimeout(() => {
      setSuccessModal(true);
    }, 1000);
  };

  export const handleDatePickerSignup = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (mode === 'date') {
      const formattedDate = currentDate.toLocaleDateString('en-PH');
      setBday(formattedDate);
    }
  };

  export const handleErrorSignup = () => {
    setLoading(false);
    Alert.alert('Something went wrong');
  };

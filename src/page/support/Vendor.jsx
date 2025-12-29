import React, { useEffect, useState } from "react";
import { Form, Input, Select, message, Card } from "antd";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "../redux/api/metaApi";
import { City, Country, State } from "country-state-city";

const Vendor = () => {
  const [form] = Form.useForm();
  const { data: contactData } = useGetContactQuery();
  const [updateContact] = useUpdateContactMutation();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (value) => {
    const country = countries.find((c) => c.isoCode === value);
    setSelectedCountry(country);
    const stateList = State.getStatesOfCountry(value);
    setStates(stateList);
    setCities([]);
    setSelectedState(null);
    form.setFieldsValue({ state: undefined, city: undefined });
  };

  const handleStateChange = (value) => {
    const state = states.find((s) => s.isoCode === value);
    setSelectedState(state);
    const cityList = City.getCitiesOfState(selectedCountry?.isoCode, value);
    setCities(cityList);
    form.setFieldsValue({ city: undefined });
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        phone: values.phone,
        email: values.email,
        Country:
          countries.find((c) => c.isoCode === values.country)?.name ||
          values.country ||
          "",
        State:
          states.find((s) => s.isoCode === values.state)?.name ||
          values.state ||
          "",
        City: values.city || "",
      };
      const res = await updateContact(data).unwrap();
      message.success(res?.message);
    } catch (err) {
      console.error(err);
      message.error(err?.data?.message || "Something went wrong!");
    }
  };

  // Helper to generate Google Map query string
  const getMapQuery = () => {
    const country = contactData?.data?.Country || "";
    const state = contactData?.data?.State || "";
    const city = contactData?.data?.City || "";

    if (city) return `${city}, ${state}, ${country}`;
    if (state) return `${state}, ${country}`;
    return country;
  };

  return (
    <div className="grid grid-cols-2 gap-6 bg-white">
      {/* LEFT SIDE: Contact Info + Map */}
      <div>
        <Card title="Current Contact Info" className="text-lg">
          <p>
            <strong>Email:</strong> {contactData?.data?.email}
          </p>
          <p className="py-2">
            <strong>Phone:</strong> {contactData?.data?.phone}
          </p>
          <p>
            <strong>Address:</strong> {contactData?.data?.Country},{" "}
            {contactData?.data?.State}, {contactData?.data?.City}
          </p>

          <div className="mt-6">
            {contactData?.data?.Country && (
              <iframe
                title="Google Map"
                width="100%"
                height="300"
                className="rounded border"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  getMapQuery()
                )}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>
        </Card>
      </div>

      {/* RIGHT SIDE: Update Form */}
      <div className="border rounded-lg p-4">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Enter your email" className="h-12" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input placeholder="Enter your phone number" className="h-12" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              label="Select Your Country"
              name="country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select
                placeholder="Select your country"
                style={{ height: "48px" }}
                showSearch
                allowClear
                onChange={handleCountryChange}
                optionLabelProp="label"
              >
                {countries?.map((country) => (
                  <Select.Option
                    key={country?.isoCode}
                    value={country?.isoCode}
                    label={country?.name}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w20/${country?.isoCode.toLowerCase()}.png`}
                        alt={country?.name}
                        className="w-5 h-3 object-cover"
                      />
                      {country?.name}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Select State" name="state">
              <Select
                placeholder="Select your state"
                style={{ height: "48px" }}
                showSearch
                allowClear
                onChange={handleStateChange}
                disabled={!selectedCountry}
              >
                {states?.map((state) => (
                  <Select.Option key={state?.isoCode} value={state?.isoCode}>
                    {state?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Select City" name="city">
              <Select
                placeholder="Select your city"
                style={{ height: "48px" }}
                showSearch
                allowClear
                disabled={!selectedState}
              >
                {cities?.map((city) => (
                  <Select.Option key={city?.name} value={city?.name}>
                    {city?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item className="pt-3">
            <button
              type="submit"
              className="px-11 bg-[#E63946] text-white py-2 rounded"
            >
              Save
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Vendor;

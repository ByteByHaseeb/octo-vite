
import React, { useState } from "react";
import {
  Image,
  Megaphone,
  LayoutGrid,
  Monitor,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import AdminPage from "../components/AdminPage";

const defaultSettings = {
  announcement: {
    enabled: true,
    text: "Free UK delivery on orders over £50",
    background: "#111827",
    textColor: "#ffffff",
  },
  hero: {
    enabled: true,
    eyebrow: "DISCOVER OCTO",
    heading: "Your Everyday Essentials, Elevated.",
    description:
      "Discover carefully selected essentials for your lifestyle, home and wellbeing.",
    buttonText: "Shop now",
    buttonLink: "/collections/all",
    desktopImage: "",
    mobileImage: "",
    alignment: "left",
    overlay: 15,
  },
  featuredCollections: {
    enabled: true,
    heading: "Shop by Collection",
    description: "Explore our curated categories.",
    columns: "4",
  },
  featuredProducts: {
    enabled: true,
    heading: "Featured Products",
    description: "Our picks for your everyday routine.",
    productCount: "5",
  },
};

const tabs = [
  { id: "announcement", label: "Announcement bar", icon: Megaphone },
  { id: "hero", label: "Homepage hero", icon: Image },
  { id: "featuredCollections", label: "Featured collections", icon: LayoutGrid },
  { id: "featuredProducts", label: "Featured products", icon: Monitor },
];

function SettingField({ label, hint, children }) {
  return (
    <label className="storefront-field">
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function VisibilityToggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`storefront-visibility ${enabled ? "is-visible" : ""}`}
      onClick={onChange}
      aria-pressed={enabled}
    >
      {enabled ? <Eye size={15} /> : <EyeOff size={15} />}
      {enabled ? "Visible" : "Hidden"}
    </button>
  );
}

function Storefront() {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("hero");
  const [saved, setSaved] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");

  const activeSettings = settings[activeTab];

  function updateField(field, value) {
    setSettings((current) => ({
      ...current,
      [activeTab]: {
        ...current[activeTab],
        [field]: value,
      },
    }));
    setSaved(false);
  }

  function resetSettings() {
    if (
      window.confirm(
        "Reset all storefront settings to their original sample values?"
      )
    ) {
      setSettings(defaultSettings);
      setSaved(false);
    }
  }

  function saveSettings() {
    // Frontend demonstration only. Persistent saving will be added with the backend.
    setSaved(true);
  }

  return (
    <AdminPage
      title="Storefront"
      description="Customize your homepage sections and promotional content."
    >
      <div className="storefront-workspace">
        <aside className="storefront-settings-nav">
          <div className="storefront-nav-heading">
            <span>HOMEPAGE SECTIONS</span>
            <span>{tabs.length}</span>
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const section = settings[tab.id];

            return (
              <button
                type="button"
                key={tab.id}
                className={`storefront-tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <span
                  className={`storefront-tab-dot ${
                    section.enabled ? "enabled" : ""
                  }`}
                />
              </button>
            );
          })}

          <div className="storefront-nav-note">
            <Monitor size={19} />
            <strong>Live storefront preview</strong>
            <p>
              Preview your content changes here before connecting permanent
              publishing.
            </p>
          </div>
        </aside>

        <section className="storefront-editor">
          <div className="storefront-editor-header">
            <div>
              <p className="storefront-eyebrow">HOMEPAGE CUSTOMIZER</p>
              <h2>{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
              <p>Customize the content and visibility of this section.</p>
            </div>

            <VisibilityToggle
              enabled={activeSettings.enabled}
              onChange={() => updateField("enabled", !activeSettings.enabled)}
            />
          </div>

          {activeTab === "announcement" && (
            <div className="storefront-editor-body">
              <div className="storefront-section-intro">
                <Megaphone size={20} />
                <div>
                  <strong>Promotional announcement</strong>
                  <p>
                    Display an important message at the top of your storefront.
                  </p>
                </div>
              </div>

              <SettingField
                label="Announcement message"
                hint="Keep your message short and easy to read."
              >
                <input
                  value={activeSettings.text}
                  maxLength={150}
                  onChange={(event) => updateField("text", event.target.value)}
                  placeholder="Enter your announcement"
                />
              </SettingField>

              <div className="storefront-field-grid">
                <SettingField label="Background color">
                  <input
                    type="color"
                    className="storefront-color-input"
                    value={activeSettings.background}
                    onChange={(event) =>
                      updateField("background", event.target.value)
                    }
                  />
                </SettingField>

                <SettingField label="Text color">
                  <input
                    type="color"
                    className="storefront-color-input"
                    value={activeSettings.textColor}
                    onChange={(event) =>
                      updateField("textColor", event.target.value)
                    }
                  />
                </SettingField>
              </div>

              <div
                className="storefront-announcement-preview"
                style={{
                  background: activeSettings.background,
                  color: activeSettings.textColor,
                }}
              >
                {activeSettings.enabled
                  ? activeSettings.text || "Your announcement will appear here"
                  : "Announcement bar is hidden"}
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="storefront-editor-body">
              <div className="storefront-section-intro">
                <Image size={20} />
                <div>
                  <strong>Main hero section</strong>
                  <p>
                    This is the first major section visitors see on your
                    homepage.
                  </p>
                </div>
              </div>

              <SettingField label="Eyebrow text">
                <input
                  value={activeSettings.eyebrow}
                  onChange={(event) =>
                    updateField("eyebrow", event.target.value)
                  }
                  placeholder="e.g. DISCOVER OCTO"
                />
              </SettingField>

              <SettingField label="Main heading">
                <textarea
                  rows={2}
                  value={activeSettings.heading}
                  onChange={(event) =>
                    updateField("heading", event.target.value)
                  }
                  placeholder="Enter your main heading"
                />
              </SettingField>

              <SettingField label="Description">
                <textarea
                  rows={3}
                  value={activeSettings.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Describe your store"
                />
              </SettingField>

              <div className="storefront-field-grid">
                <SettingField label="Button text">
                  <input
                    value={activeSettings.buttonText}
                    onChange={(event) =>
                      updateField("buttonText", event.target.value)
                    }
                    placeholder="Shop now"
                  />
                </SettingField>

                <SettingField label="Button link">
                  <input
                    value={activeSettings.buttonLink}
                    onChange={(event) =>
                      updateField("buttonLink", event.target.value)
                    }
                    placeholder="/collections/all"
                  />
                </SettingField>
              </div>

              <SettingField
                label="Desktop image URL"
                hint="Paste an image URL for now. Image upload will be implemented later."
              >
                <input
                  type="url"
                  value={activeSettings.desktopImage}
                  onChange={(event) =>
                    updateField("desktopImage", event.target.value)
                  }
                  placeholder="https://example.com/hero-desktop.jpg"
                />
              </SettingField>

              <SettingField
                label="Mobile image URL"
                hint="Optional. If empty, the desktop image is used in the preview."
              >
                <input
                  type="url"
                  value={activeSettings.mobileImage}
                  onChange={(event) =>
                    updateField("mobileImage", event.target.value)
                  }
                  placeholder="https://example.com/hero-mobile.jpg"
                />
              </SettingField>

              <div className="storefront-field-grid">
                <SettingField label="Text alignment">
                  <select
                    value={activeSettings.alignment}
                    onChange={(event) =>
                      updateField("alignment", event.target.value)
                    }
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </SettingField>

                <SettingField label={`Image overlay: ${activeSettings.overlay}%`}>
                  <input
                    type="range"
                    min="0"
                    max="70"
                    step="5"
                    value={activeSettings.overlay}
                    onChange={(event) =>
                      updateField("overlay", Number(event.target.value))
                    }
                  />
                </SettingField>
              </div>
            </div>
          )}

          {activeTab === "featuredCollections" && (
            <div className="storefront-editor-body">
              <div className="storefront-section-intro">
                <LayoutGrid size={20} />
                <div>
                  <strong>Featured collections</strong>
                  <p>
                    Set the heading and layout for your collection showcase.
                  </p>
                </div>
              </div>

              <SettingField label="Section heading">
                <input
                  value={activeSettings.heading}
                  onChange={(event) => updateField("heading", event.target.value)}
                />
              </SettingField>

              <SettingField label="Description">
                <textarea
                  rows={3}
                  value={activeSettings.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                />
              </SettingField>

              <SettingField label="Desktop columns">
                <select
                  value={activeSettings.columns}
                  onChange={(event) =>
                    updateField("columns", event.target.value)
                  }
                >
                  <option value="2">2 columns</option>
                  <option value="3">3 columns</option>
                  <option value="4">4 columns</option>
                  <option value="5">5 columns</option>
                  <option value="6">6 columns</option>
                </select>
              </SettingField>
            </div>
          )}

          {activeTab === "featuredProducts" && (
            <div className="storefront-editor-body">
              <div className="storefront-section-intro">
                <ShoppingBagIcon />
                <div>
                  <strong>Featured products</strong>
                  <p>
                    Configure the heading and number of products to showcase.
                  </p>
                </div>
              </div>

              <SettingField label="Section heading">
                <input
                  value={activeSettings.heading}
                  onChange={(event) => updateField("heading", event.target.value)}
                />
              </SettingField>

              <SettingField label="Description">
                <textarea
                  rows={3}
                  value={activeSettings.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                />
              </SettingField>

              <SettingField label="Products to display">
                <select
                  value={activeSettings.productCount}
                  onChange={(event) =>
                    updateField("productCount", event.target.value)
                  }
                >
                  <option value="4">4 products</option>
                  <option value="5">5 products</option>
                  <option value="6">6 products</option>
                  <option value="8">8 products</option>
                  <option value="10">10 products</option>
                </select>
              </SettingField>
            </div>
          )}

          <div className="storefront-editor-footer">
            <button
              type="button"
              className="admin-secondary-button"
              onClick={resetSettings}
            >
              <RotateCcw size={16} />
              Reset defaults
            </button>

            <button
              type="button"
              className="admin-primary-button"
              onClick={saveSettings}
            >
              {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
              {saved ? "Changes noted" : "Save changes"}
            </button>
          </div>

          {saved && (
            <p className="storefront-save-notice">
              <CheckCircle2 size={16} />
              Demo state updated. Permanent saving will be added with the
              backend.
            </p>
          )}
        </section>

        <aside className="storefront-preview-panel">
          <div className="storefront-preview-header">
            <div>
              <strong>Preview</strong>
              <span>Sample storefront</span>
            </div>

            <div className="storefront-preview-switch">
              <button
                type="button"
                className={previewMode === "desktop" ? "active" : ""}
                onClick={() => setPreviewMode("desktop")}
                aria-label="Desktop preview"
              >
                <Monitor size={16} />
              </button>
              <button
                type="button"
                className={previewMode === "mobile" ? "active" : ""}
                onClick={() => setPreviewMode("mobile")}
                aria-label="Mobile preview"
              >
                <Smartphone size={16} />
              </button>
            </div>
          </div>

          <div
            className={`storefront-preview-frame ${
              previewMode === "mobile" ? "mobile-preview" : ""
            }`}
          >
            {settings.announcement.enabled && (
              <div
                className="storefront-preview-announcement"
                style={{
                  background: settings.announcement.background,
                  color: settings.announcement.textColor,
                }}
              >
                {settings.announcement.text}
              </div>
            )}

            <div className="storefront-preview-headerbar">
              <strong>OCTO</strong>
              <span>Shop&nbsp;&nbsp; Collections&nbsp;&nbsp; About</span>
            </div>

            {settings.hero.enabled && (
              <div
                className={`storefront-preview-hero align-${settings.hero.alignment}`}
                style={{
                  backgroundImage: (() => {
                    const imageUrl =
                      previewMode === "mobile"
                        ? settings.hero.mobileImage || settings.hero.desktopImage
                        : settings.hero.desktopImage;

                    return imageUrl
                      ? `linear-gradient(rgba(0,0,0,${
                          settings.hero.overlay / 100
                        }), rgba(0,0,0,${
                          settings.hero.overlay / 100
                        })), url("${imageUrl}")`
                      : `linear-gradient(135deg, #f1f5f9, #e2e8f0)`;
                  })(),
                }}
              >
                <div className="storefront-preview-hero-content">
                  <span>{settings.hero.eyebrow}</span>
                  <h3>{settings.hero.heading}</h3>
                  <p>{settings.hero.description}</p>
                  <button type="button">{settings.hero.buttonText}</button>
                </div>
              </div>
            )}

            {settings.featuredCollections.enabled && (
              <div className="storefront-preview-section">
                <h3>{settings.featuredCollections.heading}</h3>
                <p>{settings.featuredCollections.description}</p>
                <div
                  className="storefront-preview-tiles"
                  style={{
                    gridTemplateColumns: `repeat(${
                      previewMode === "mobile"
                        ? 2
                        : Number(settings.featuredCollections.columns)
                    }, minmax(0, 1fr))`,
                  }}
                >
                  {["Beauty", "Wellness", "Home", "Everyday"].map((item) => (
                    <div key={item}>
                      <span />
                      <small>{item}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {settings.featuredProducts.enabled && (
              <div className="storefront-preview-section">
                <h3>{settings.featuredProducts.heading}</h3>
                <p>{settings.featuredProducts.description}</p>
                <div className="storefront-preview-products">
                  {Array.from({
                    length: Math.min(
                      Number(settings.featuredProducts.productCount),
                      previewMode === "mobile" ? 2 : 4
                    ),
                  }).map((_, index) => (
                    <div key={index}>
                      <span />
                      <small>Essential product</small>
                      <strong>£24.99</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!settings.hero.enabled &&
              !settings.featuredCollections.enabled &&
              !settings.featuredProducts.enabled && (
                <div className="storefront-preview-empty">
                  Your homepage sections are hidden.
                </div>
              )}
          </div>

          <p className="storefront-preview-caption">
            <Eye size={14} />
            Visual mockup only. It does not publish to the public storefront.
          </p>
        </aside>
      </div>
    </AdminPage>
  );
}

function ShoppingBagIcon() {
  return <LayoutGrid size={20} />;
}

export default Storefront;

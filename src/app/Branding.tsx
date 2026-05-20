import { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function Branding() {
  const [firmLogo, setFirmLogo] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFirmLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#0B1120] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Branding Configuration</h1>
        <p className="text-gray-400 text-sm">
          Customise the look and feel of your client reports and portal to match your corporate identity.
        </p>
      </div>

      {/* Firm Logo Section */}
      <div className="bg-[#111827] rounded-lg border border-gray-800 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-white font-bold mb-2">Firm Logo</h2>
            <p className="text-gray-400 text-sm max-w-2xl">
              Upload your firm logo as a PNG file using a transparent background (if possible). This logo will appear in all reports and client portals.
            </p>
          </div>
          <div className="text-xs text-gray-500">
            <span className="text-gray-400">Recommended:</span> 400 x 200px (Max)
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-[#0B1120] border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center">
          {firmLogo ? (
            <div className="flex flex-col items-center">
              <img src={firmLogo} alt="Firm Logo" className="max-h-32 mb-4" />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                  CHANGE LOGO
                </div>
              </label>
            </div>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 mb-2">No Firm Logo has been uploaded</p>
              <p className="text-gray-500 text-sm mb-4">Tap here to upload or drag here</p>
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  UPLOAD/LOAD
                </div>
              </label>
            </>
          )}
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Cover Image Section */}
      <div className="bg-[#111827] rounded-lg border border-gray-800 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-white font-bold mb-2">Cover Image</h2>
            <p className="text-gray-400 text-sm max-w-2xl">
              Upload a high-resolution cover image that uses a personalized look to your reports. For best results, use a 1920x1080 image with a solid color that blends into your brand.
            </p>
          </div>
          <div className="text-xs text-gray-500">
            <span className="text-gray-400">Recommended:</span> 1920x1080
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-[#0B1120] border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center">
          {coverImage ? (
            <div className="flex flex-col items-center w-full">
              <img src={coverImage} alt="Cover" className="max-h-48 w-full object-cover mb-4 rounded" />
              <label htmlFor="cover-upload" className="cursor-pointer">
                <div className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                  CHANGE COVER IMAGE
                </div>
              </label>
            </div>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 mb-2">No Cover Image has been uploaded</p>
              <p className="text-gray-500 text-sm mb-4">Tap here to upload or drag here</p>
              <label htmlFor="cover-upload" className="cursor-pointer">
                <div className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  UPLOAD COVER IMAGE
                </div>
              </label>
            </>
          )}
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Brand Colours Section */}
      <div className="bg-[#111827] rounded-lg border border-gray-800 p-6">
        <h2 className="text-white font-bold mb-2">Brand Colours</h2>
        <p className="text-gray-400 text-sm mb-6">
          Customize colours for buttons, headings, charts and graphs. Choose colours that reflect your brand's style, enhancing user experience and reinforcing brand recognition.
        </p>

        {/* Theme colours */}
        <ColorPalette
          title="Theme colours"
          colors={['#4F6FA8', '#6B8EC9']}
        />

        {/* Risk analysis chart Colours */}
        <ColorPalette
          title="Risk analysis chart Colours"
          description="Customize the risk analysis chart color combinations"
          colors={['#E879F9', '#A78BFA', '#60A5FA', '#2DD4BF', '#5EEAD4']}
        />

        {/* Charting colours */}
        <ColorPalette
          title="Charting colours"
          description="Apply theme colors"
          colors={['#4B5563', '#047857', '#10B981', '#F59E0B', '#DC2626']}
        />

        {/* Comparison colours */}
        <ColorPalette
          title="Comparison colours"
          description="Customize the comparison chart color combinations"
          colors={['#F59E0B', '#3B82F6']}
        />

        {/* Breakdown colours */}
        <ColorPalette
          title="Breakdown colours"
          description="Customize the breakdown chart color combinations"
          colors={['#FCD34D', '#F59E0B', '#10B981', '#14B8A6', '#6B7280']}
        />

        {/* Goal and charges chart Colours */}
        <ColorPalette
          title="Goal and charges chart Colours"
          description="Customize the goal and charges chart color combinations"
          colors={['#1E3A8A', '#0D9488', '#EC4899', '#FFFFFF', '#A855F7']}
        />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-xs">
        © 2025 Koris.AI. All rights reserved. Version 2.4.0
      </div>
    </div>
  );
}

// Color Palette Component
interface ColorPaletteProps {
  title: string;
  description?: string;
  colors: string[];
}

function ColorPalette({ title, description, colors }: ColorPaletteProps) {
  return (
    <div className="border-t border-gray-800 py-4 flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-white text-sm font-medium mb-1">{title}</h3>
        {description && <p className="text-gray-500 text-xs">{description}</p>}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border-2 border-gray-700 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        
        <button className="text-[#3B82F6] text-xs hover:text-[#2563EB] transition-colors whitespace-nowrap">
          Reset Palette
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";

const gradientStyle = {
  background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 45%, #7c3aed 100%)",
};

export class Hero3DErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    console.warn("[Hero3D] Fallback to gradient:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="absolute inset-0" style={gradientStyle} />;
    }
    return this.props.children;
  }
}
